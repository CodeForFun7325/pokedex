terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "a3ef7895-e7c0-40ec-809a-95edae2a391b" # Replace with your Azure subscription ID
}

resource "azurerm_resource_group" "pokedex" {
  name     = "pokedex-rg"
  location = "WEST US 2"
  tags = {
    environment = "development"
    project     = "pokedex"
  }
}

### Uncomment the following blocks to create an Azure Service Plan and a Windows Web App

# resource "azurerm_service_plan" "pokedex" {
#   name                = "pokedex-service-plan"
#   location            = azurerm_resource_group.pokedex.location
#   resource_group_name = azurerm_resource_group.pokedex.name
#   sku_name            = "D1"
#   os_type             = "Windows"
#   tags = {
#     environment = "development"
#     project     = "pokedex"
#   }
# }

# resource "azurerm_windows_web_app" "pokedex" {
#   name                = "pokedex-web-app"
#   resource_group_name = azurerm_resource_group.pokedex.name
#   location            = azurerm_resource_group.pokedex.location
#   service_plan_id     = azurerm_service_plan.pokedex.id
#   site_config {
#     always_on = false
#   }
#   tags = {
#     environment = "development"
#     project     = "pokedex"
#   }
# }

resource "azurerm_cosmosdb_account" "pokedex_db_account" {
  name                = "pokedex-db-account"
  resource_group_name = azurerm_resource_group.pokedex.name
  location            = azurerm_resource_group.pokedex.location
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Eventual"
  }

  geo_location {
    location          = "WEST US"
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_sql_database" "pokedex_db" {
  name                = "pokedex-db"
  resource_group_name = azurerm_cosmosdb_account.pokedex_db_account.resource_group_name
  account_name        = azurerm_cosmosdb_account.pokedex_db_account.name
  throughput          = 400
}

resource "azurerm_cosmosdb_sql_container" "pokemon_container" {
  name                = "pokemon-container"
  resource_group_name = azurerm_cosmosdb_account.pokedex_db_account.resource_group_name
  account_name        = azurerm_cosmosdb_account.pokedex_db_account.name
  database_name       = azurerm_cosmosdb_sql_database.pokedex_db.name
  partition_key_paths = ["/pokemon/pokemonName"]

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/pokemonForm"
    }
  }

  throughput = 400
}
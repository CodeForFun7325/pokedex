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

  local_authentication_disabled = true

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

resource "azurerm_cosmosdb_sql_container" "pokemon_sightings" {
  name                  = "Sightings"
  resource_group_name   = azurerm_cosmosdb_account.pokedex_db_account.resource_group_name
  account_name          = azurerm_cosmosdb_account.pokedex_db_account.name
  database_name         = azurerm_cosmosdb_sql_database.pokedex_db.name
  partition_key_paths   = ["/pokemonName", "/pokemonForm"]
  partition_key_kind    = "MultiHash"
  partition_key_version = 2

  indexing_policy {
    indexing_mode = "consistent"

    included_path {
      path = "/*"
    }

    excluded_path {
      path = "/\"_etag\"/?"
    }

  }

  throughput = 400
}

resource "azurerm_storage_account" "pokedex_storage" {
  name                     = "pokestorageaccount7325"
  resource_group_name      = azurerm_resource_group.pokedex.name
  location                 = azurerm_resource_group.pokedex.location
  account_tier             = "Standard"
  account_replication_type = "ZRS"

  tags = {
    environment = "development"
    project     = "pokedex"
  }
}

resource "azurerm_storage_container" "pokedex_container" {
  name               = "pokemon-images"
  storage_account_id = azurerm_storage_account.pokedex_storage.id
}
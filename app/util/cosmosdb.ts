"use server"

import { Container, CosmosClient } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";

export async function FetchDatabaseContainer(): Promise<Container> {

  dotenv.config({ path: ".env.development.local" });

  // Initialize cosmos db and storage account endpoints
  const dbEndpoint = `https://${process.env.AZURE_DB_NAME}.documents.azure.com:443/`;

  // Create new database and storage client. These client objects will be used to interact with the database and storage account
  const client = new CosmosClient({ endpoint: dbEndpoint, aadCredentials: new DefaultAzureCredential() });

  // Fetch pokdex-db database 
  const pokedexDb = client.database("pokedex-db");

  // Fetch sightings container - in cosmos db, a container is a collection of items
  // Similar to how a table is a collection of rows in a relational database
  const sightingsContainer = pokedexDb.container("Sightings");

  return sightingsContainer;
}
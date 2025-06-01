"use server"; 
import { Container, CosmosClient, Database, SqlQuerySpec, QueryIterator } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

import Pokemon from "../entities/pokemon";

//az cosmosdb sql role assignment create --account-name pokedex-db-account --resource-group pokedex-rg --scope "/" --principal-id 6418cc17-1ba6-46bd-90cc-24bfb6788017 --role-definition-id "00000000-0000-0000-0000-000000000002"

export default async function PostPokemonSighting(pokemonObject : Pokemon) {

  // Authenticate to Azure Cosmos DB
  const endpoint = "https://pokedex-db-account.documents.azure.com:443/";

  const credential = new DefaultAzureCredential();

  // Create new database client. This is client object is used to interact with the database.
  const client = new CosmosClient({ endpoint, aadCredentials: credential });

  // Fetch pokdex-db database 
  const pokedexDb= client.database("pokedex-db");
  
  // Fetch sightings container - in cosmos db, a container is a collection of items
  // Similar to how a table is a collection of rows in a relational database
  const sightingsContainer = pokedexDb.container("Sightings");

  // Query for a specific pokemon sighting with the given pokemon name and form
  // We expect this to always return a single item, as each pokemon sightings are unique
  const querySpec : SqlQuerySpec = {
    query: "SELECT * FROM c WHERE c.pokemonName = @pokemonName AND c.pokemonForm = @pokemonForm",
    parameters: [
      {
        name: "@pokemonName",
        value: "charizard" // Example pokemon ID, replace with actual ID
      }
      , {
        name: "@pokemonForm",
        value: "x" // Example pokemon form, replace with actual form
      }
    ]
  };

  const sightings =  await sightingsContainer.items.query(querySpec).fetchAll();

  // Parse out the json object returned from the query
  const sightingInformation = sightings.resources;

  // If the query returned no results, we can assume that then the pokemon sighting does not exist
  // yet and we should create a new item in the container with the passed in information
  sightingsContainer.items.create({
    pokemonId: pokemonObject.id,
    pokemonName: pokemonObject.name,
    pokemonForm: pokemonObject.form,
    pokemonType1: pokemonObject.type1,
    pokemonType2: pokemonObject.type2,
    abilities: pokemonObject.abilities,
    moves: pokemonObject.moves,
  });
}


"use server"; 
import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
import { BlobClient, BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from  "dotenv"; 

import Pokemon from "../entities/pokemon";


//az cosmosdb sql role assignment create --account-name pokedex-db-account --resource-group pokedex-rg --scope "/" --principal-id 6418cc17-1ba6-46bd-90cc-24bfb6788017 --role-definition-id "00000000-0000-0000-0000-000000000002"

export default async function PostPokemonSighting(pokemonObject : Pokemon) {

  dotenv.config({path: ".env.development.local"}); 

  // Initialize cosmos db and storage account endpoints
  const dbEndpoint = `https://${process.env.AZURE_DB_NAME}.documents.azure.com:443/`;
  const storageEndpoint = `https://${process.env.AZURE_STORAGE_NAME}.blob.core.windows.net/`; 
  const containerEndpoint = `https://${process.env.AZURE_STORAGE_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER}`;

  // Initialize new azure credential object
  const credential = new DefaultAzureCredential();

  // Create new database and storage client. These client objects will be used to interact with the database and storage account
  const client = new CosmosClient({ endpoint: dbEndpoint, aadCredentials: credential });
  const blobServiceClient = new BlobServiceClient(storageEndpoint, credential);

  // Initialize blob storage account client to interact with the blob service
  const containerClient = await blobServiceClient.getContainerClient(containerEndpoint);

  console.log(containerEndpoint); 

  // Create the container if it does not exist
  try { 
    const createContainerResponse = await containerClient.createIfNotExists();

    if (createContainerResponse.succeeded) 
      console.log("Container created successfully");
    else 
      console.log("Container already exists");

  } catch (error) { 
    console.log("Error creating container", error); 
    throw error; 
  }

  // Fetch pokdex-db database 
  const pokedexDb= client.database("pokedex-db");
  
  // Fetch sightings container - in cosmos db, a container is a collection of items
  // Similar to how a table is a collection of rows in a relational database
  const sightingsContainer = pokedexDb.container("Sightings");

  // Query for a specific pokemon sighting with the given pokemon name and form
  // We expect this to always return a single item, as each pokemon sightings are unique
  const querySpec : SqlQuerySpec = {
    query: "SELECT * FROM Sightings s WHERE s.pokemonName = @pokemonName AND s.pokemonForm = @pokemonForm",
    parameters: [
      {
        name: "@pokemonName",
        value: pokemonObject.name // Example pokemon ID, replace with actual ID
      }
      , {
        name: "@pokemonForm",
        value: pokemonObject.form // Example pokemon form, replace with actual form
      }
    ]
  };

  const sightings =  await sightingsContainer.items.query(querySpec).fetchAll();

  // Parse out the json object returned from the query
  const sightingInformation = sightings.resources;
  const sighting = sightingInformation[0];
  
  // If the query returned no results, we can assume that the pokemon sighting does not exist
  // yet and we should create a new item in the container with the passed in information
  try { 
    if (!sighting) { 
      // Upload pokemon data to the database
      sightingsContainer.items.create({
        id: String(pokemonObject.id),
        pokemonId: pokemonObject.id,
        pokemonName: pokemonObject.name,
        pokemonForm: pokemonObject.form,
        pokemonType1: pokemonObject.type1,
        pokemonType2: pokemonObject.type2,
        abilities: pokemonObject.abilities,
        moves: pokemonObject.moves
      });

      // Upload pokemon image to the blob storage
      const blockBlobClient = containerClient.getBlockBlobClient(`${pokemonObject.id}-${pokemonObject.form}`);
      // const uploadBlobResponse = await blockBlobClient.uploadData(pokemonObject.sprites.image);

      return { success: true, message: "Uploaded successfully" }
    } 
    else { 
      return { 
        success: false, 
        message: "A pokemon sighting with this name and form already exists. Please try again with a different name or form."
      }
    }

  } catch (error) { 
    // TODO: Need to add better error handling here. Probably going to be based on status code
    return { success: false, message: "There was an error uploading the data to the PokeDex"}
  }
}
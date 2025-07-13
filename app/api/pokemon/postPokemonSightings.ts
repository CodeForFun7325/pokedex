"use server";
import { SqlQuerySpec } from "@azure/cosmos";
import { BlobServiceClient, ContainerClient, ContainerSASPermissions, generateBlobSASQueryParameters, SASProtocol, BlobSASSignatureValues } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { FetchDatabaseContainer } from "@/app/util/cosmosdb";

import * as dotenv from "dotenv";

import Pokemon from "@/app/entities/pokemon";

async function InitializeBlobContainerClients(): Promise<ContainerClient> {

  dotenv.config({ path: ".env.development.local" });

  // Get environment variables
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const containerName = process.env.AZURE_STORAGE_BLOB_CONTAINER_NAME

  // Initialize storage endpoint
  const storageEndpoint = `https://${accountName}.blob.core.windows.net/`;

  // Initialize time limit variables
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const NOW = new Date();

  // Initialize start and end dates for delegation key;
  const ONE_DAY_BEFORE = new Date(NOW.valueOf() - ONE_DAY);
  const ONE_DAY_AFTER = new Date(NOW.valueOf() + ONE_DAY);

  // Initialize blob service client. This client object will allow us to interact 
  // with the blob service within our storage account
  const blobServiceClient = new BlobServiceClient(storageEndpoint, new DefaultAzureCredential());

  // Retrieve user delegation key
  const userDelegationKey = await blobServiceClient.getUserDelegationKey(ONE_DAY_BEFORE, ONE_DAY_AFTER);

  // Initialize SAS token options
  const sasOptions: BlobSASSignatureValues = {
    containerName: containerName ?? "",
    permissions: ContainerSASPermissions.parse("rcwl"),
    startsOn: ONE_DAY_BEFORE,
    expiresOn: ONE_DAY_AFTER,
    protocol: SASProtocol.HttpsAndHttp
  };

  // Initialize SAS token
  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    userDelegationKey,
    accountName ?? ""
  ).toString();

  // Initialize container client 
  // Initialize container client using SAS token url 
  const containerEndpoint = `https://${accountName}.blob.core.windows.net/${containerName}?${sasToken}`;
  const containerClient = new ContainerClient(containerEndpoint);

  return containerClient;
}


//az cosmosdb sql role assignment create --account-name pokedex-db-account --resource-group pokedex-rg --scope "/" --principal-id 6418cc17-1ba6-46bd-90cc-24bfb6788017 --role-definition-id "00000000-0000-0000-0000-000000000002"

export default async function PostPokemonSighting(pokemonObject: Pokemon, fileType: string) {

  dotenv.config({ path: ".env.development.local" });

  const sightingsContainer = await FetchDatabaseContainer();
  const containerClient: ContainerClient = await InitializeBlobContainerClients();

  // Query for a specific pokemon sighting with the given pokemon name and form
  // We expect this to always return a single item, as each pokemon sighting is meant to be unique
  const querySpec: SqlQuerySpec = {
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

  const sightings = await sightingsContainer.items.query(querySpec).fetchAll();

  // Parse out the json object returned from the query
  const sightingInformation = sightings.resources;
  const sighting = sightingInformation[0];

  // If the query returned no results, we can assume that the pokemon sighting does not exist
  // yet and we should create a new item in the container with the passed in information
  try {

    if (!sighting) {

      // Upload pokemon image to the blob storage
      // Will need to have Storage Blob Data Reader and Storage Blob Data Contributor role to have this work
      const base64ImageString = pokemonObject.sprites.image?.replace(/^data:image\/\w+;base64,/, '') ?? "";
      const imageBuffer = Buffer.from(base64ImageString, 'base64')
      const blobName = `${pokemonObject.id}-${pokemonObject.form}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(imageBuffer,
        imageBuffer.length, {
        blobHTTPHeaders: {
          blobContentType: fileType
        }
      });
      
      // Upload pokemon data to the database
      sightingsContainer.items.create({
        id: String(pokemonObject.id),
        pokemonId: pokemonObject.id,
        pokemonName: pokemonObject.name,
        pokemonForm: pokemonObject.form,
        pokemonType1: pokemonObject.type1,
        pokemonType2: pokemonObject.type2,
        abilities: pokemonObject.abilities,
        moves: pokemonObject.moves, 
        stats: pokemonObject.stats, 
        sprites: { image: blockBlobClient.url }
      });

      return { success: true, message: "Uploaded successfully" }
    }
    else {

      return {
        success: false,
        message: "This form has already been reported for this pokemon. Please try again with a different pokemon or form."
      }

    }

  } catch (error) {

    // TODO: Need to add better error handling here. Probably going to be based on status code
    return { success: false, message: `There was an error uploading the data to the PokeDex: ${error}` }

  }
}
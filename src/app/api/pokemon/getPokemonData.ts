import Pokedex from "pokedex-promise-v2"

const P = new Pokedex(); 

export async function GetMovesList() { 
  const movesRequest = await P.getMovesList();

  return movesRequest.results; 
} 

export async function GetAbilitiesList() { 
  const abilitiesRequest = await P.getAbilitiesList(); 

  return abilitiesRequest.results; 
}

export async function GetTypesList() { 
  const typesRequest = await P.getTypesList(); 

  return typesRequest.results; 
}
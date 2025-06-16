import { Suspense } from "react";
import PokemonForm from "./components/pokemonform/pokemonform";
import Pokedex from "pokedex-promise-v2";

export default async function ReportCiting() { 
  /** Stage: Call the PokeAPI endpoing to retrieve a list of all moves, abilities, and types */ 
  const P = new Pokedex();

  const movesRequest = await P.getMovesList(); 
  let moves = movesRequest.results; 

  const abilitiesRequest = await P.getAbilitiesList();
  let abilities = abilitiesRequest.results;

  const typesRequest = await P.getTypesList(); 
  let types = typesRequest.results;

  return (
    <>
      <h1>Report Pokemon Sighting</h1>
      <PokemonForm moves={moves} abilities={abilities} types={types}/>
    </>
  ); 
}
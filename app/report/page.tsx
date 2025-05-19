import PokemonForm from "./components/pokemonform/pokemonform";
import Pokedex from "pokedex-promise-v2";

export default async function ReportCiting() { 

  const P = new Pokedex();

  const movesRequest = await P.getMovesList(); 
  let moves = await movesRequest.results; 

  const abilitiesRequest = await P.getAbilitiesList();
  let abilities = await abilitiesRequest.results;

  const typesRequest = await P.getTypesList(); 
  let types = await typesRequest.results;

  if (!moves || !abilities || !types)
    return <h1>Loading...</h1>

  return (
    <>
      <h1>Report Pokemon Sighting</h1>
      <PokemonForm moves={moves} abilities={abilities} types={types}/>
    </>
  ); 
}
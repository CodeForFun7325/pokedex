import { Suspense } from "react";
import PokemonForm from "./components/pokemonform/pokemonform";
import { GetMovesList, GetAbilitiesList, GetTypesList } from "@/app/api/pokemon/getPokemonData";

export default async function ReportCiting() { 

  const moves = await GetMovesList(); 
  const abilities = await GetAbilitiesList(); 
  const types = await GetTypesList(); 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PokemonForm moves={moves} abilities={abilities} types={types}/>
    </Suspense>
  ); 
}
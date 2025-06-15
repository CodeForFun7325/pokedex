"use client"; 
import { useQuery } from '@tanstack/react-query';
import Pokemon from '../entities/pokemon';
import { CosmosDbDiagnosticLevel } from '@azure/cosmos';

export default function useFetchPokemon(url: string) { 

  if (url === "") 
    return; 

  const { data } = useQuery({
    queryKey: [url, url], 
    queryFn: async () => { 
      const response = await fetch(url); 
      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      } 
      return response.json(); 
    }, 
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  }); 


  let pokemonAbilities : string[] = []; 
  if (data && data.abilities && Array.isArray(data.abilities)) 
    
    pokemonAbilities = data.abilities.map((ability:unknown)  => { 
      if (ability && ability instanceof Object && 
          "ability" in ability && ability.ability instanceof Object && 
          "name" in ability.ability && typeof ability.ability.name === "string" ) 
         
          return ability.ability.name
        
  }); 

  let pokemonMoves : string[] = [];
  if (data && data.moves && Array.isArray(data.moves)) 
    
    pokemonMoves = data.moves.map((move:unknown)  => { 
      if (move && move instanceof Object && 
          "move" in move && move.move instanceof Object && 
          "name" in move.move && typeof move.move.name === "string")
          
        return move.move.name
  }); 
  
  // parse out only the data we need
  const p : Pokemon = { 
    name: data?.name || '', 
    type1: data?.types[0]?.type?.name || '', 
    type2: data?.types[1]?.type?.name || '', 
    form: "", 
    abilities: pokemonAbilities,
    id: data?.id || 0, 
    stats: data?.stats || [],
    moves:  pokemonMoves,
    sprites: data?.sprites.other["official-artwork"] || {}
  }
  
  return { p }; 
}

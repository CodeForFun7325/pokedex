"use client"; 
import { useQuery } from '@tanstack/react-query';
import Pokemon from '../entities/pokemon';

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

  // parse out only the data we need
  const p : Pokemon = { 
    name: data?.name || '', 
    type1: data?.types[0]?.type?.name || '', 
    type2: data?.types[1]?.type?.name || '', 
    abilities: data?.abilities.map((ability: any) => ability.ability.name) || [],
    id: data?.id || 0, 
    moves: data?.moves.map((move: any) => move.move.name) || [],
    sprites: data?.sprites.other["official-artwork"] || {}
  }
  
  return { p }; 
}

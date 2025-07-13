"use server";

import Pokedex from 'pokedex-promise-v2';
import Pokemon from '@/app/entities/pokemon';
import Stats from '@/app/entities/stats';
import { statsDecodeMap } from '@/app/entities/stats';
import { FetchDatabaseContainer } from '@/app/util/cosmosdb';
import { SqlQuerySpec } from "@azure/cosmos";

export default async function GetPokemonSightings(pokemon: string) {
  
  if (pokemon === "") return; 
  
  const baseData = await GetPokedexData(pokemon); 

  const userSightings : Pokemon[] = await GetUserSightings(pokemon); 

  const pokemonData : Pokemon[] = [baseData?.p, ...userSightings]

  return { pokemonData }; 
}

async function GetPokedexData(pokemon: string) { 
  const P = new Pokedex(); 
  
  const data = await P.getPokemonByName(pokemon); 

  /** Stage: Parse out pokemon abilities */
  let pokemonAbilities : string[] = [];  
  if (data && data.abilities && Array.isArray(data.abilities)) 

    pokemonAbilities = data.abilities.map((ability:unknown) => { 

      if (ability && ability instanceof Object && 
        "ability" in ability && ability.ability instanceof Object && 
        "name" in ability.ability && typeof ability.ability.name === "string")

        return ability.ability.name

      else return "";
    })

  /** Stage: Parse out pokemon moves */
  let pokemonMoves : string[] = [];
  if (data && data.moves && Array.isArray(data.moves)) 
    
    pokemonMoves = data.moves.map((move:unknown)  => { 
      if (move && move instanceof Object && 
          "move" in move && move.move instanceof Object && 
          "name" in move.move && typeof move.move.name === "string")
          
        return move.move.name

      else return ""; 
  }); 

  /** Stage: Parse out pokemon stats */
  let pokemonStats : Stats[] = [];
  
  if (data && data.stats && Array.isArray(data.stats)) { 

    pokemonStats = data.stats.map((stat: unknown) => { 
      const pokemonStat: Stats =  {
        base_stat: 0,
        statDecode: ""
      }; 

      if (stat && stat instanceof Object) { 

        if ("base_stat" in stat && typeof stat.base_stat === "number")
          pokemonStat.base_stat = stat.base_stat; 
        
        if ("stat" in stat && stat.stat instanceof Object && 
            "name" in stat.stat && typeof stat.stat.name === "string")
          // Decode the stat name using teh statsDecodeMap
          // If the stat name is not in the map, use the original name
          pokemonStat.statDecode = statsDecodeMap[stat.stat.name] || stat.stat.name;

      }

      return pokemonStat;
    }); 
  }

  /** Stage: Initialize and return a pokemon object with all the data that we parsed */
  const p : Pokemon = { 
    name: data?.name || '', 
    type1: data?.types[0]?.type?.name || '', 
    type2: data?.types[1]?.type?.name || '', 
    form: "", 
    abilities: pokemonAbilities,
    id: data?.id || 0, 
    stats: pokemonStats || [],
    moves:  pokemonMoves,
    sprites: { image: data?.sprites.other["official-artwork"]["front_default"] || ""}
  }
  
  return { p }; 
}

async function GetUserSightings(pokemon:string) { 
  const sightingsContainer = await FetchDatabaseContainer(); 

  pokemon = pokemon ? pokemon.charAt(0).toUpperCase() + pokemon.slice(1) : ""

  const querySpec: SqlQuerySpec = {
    query: "SELECT * FROM Sightings s WHERE s.pokemonName = @pokemonName",
    parameters: [
      {
        name: "@pokemonName",
        value: pokemon 
      }
    ]
  };

  const sightingInformation = await sightingsContainer.items.query(querySpec).fetchAll(); 
  const sightings = sightingInformation.resources;

  const pokemonObject : Pokemon[] = sightings.map((sighting) => { 
    
    return { 
      name: sighting.pokemonName, 
      type1: sighting.pokemonType1, 
      type2: sighting.pokemonType2, 
      form: sighting.pokemonForm, 
      id: sighting.pokemonId, 
      abilities: sighting.abilities, 
      stats: sighting.stats, 
      moves: sighting.moves, 
      sprites: sighting.sprites
    }

  });

  return pokemonObject; 
}
"use client"; 

// Components
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfoTabContainer from "@/src/app/component/info/infotabcontainer";
import Card from '@/src/app/component/card/card';

// Hooks
import usePokemonSelect from '@/src/app/hooks/usePokemonSelect';

/// Entities
import { PokemonListResponse } from '@/src/app/entities/pokemon';

/// CSS Styling
import "./gallery.css";

const queryClient = new QueryClient(); 

export default function Gallery({ pokemons }: { pokemons: PokemonListResponse[] }) { 
  
  const { selectedPokemon, showInfo, handlePokemonSelect } = usePokemonSelect();

  /** Stage: Map the list of pokemons into card components */
  const PokemonCards =  pokemons.map((pokemon) => { 
    const urlComponent = pokemon.url.split("/");
    const index = urlComponent[urlComponent.length - 2];

    return (
      <Card key = {index}
            name={pokemon.name} 
            imageSource={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
            onClick={handlePokemonSelect} />
    ); 
  });
  
  /** Stage: Render the list of card components
   * If the user has clicked a pokemon card, we will also render the info component
   * This info component will retrieve the pokemon data from the PokeAPI and display it
   */
  return (
    <div className="gallery">
      {PokemonCards}
      <QueryClientProvider client={queryClient}>
        {
          showInfo && 
          <InfoTabContainer pokemon={selectedPokemon} handleCloseInfo={handlePokemonSelect} />
        }
      </QueryClientProvider>
    </div>
  )
}
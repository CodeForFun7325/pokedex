"use client"; 

/// Component Imports
import React, { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Info from '../info/info';

/// Hook Imports
import usePokemonSelect from '../../hooks/usePokemonSelect';

/// CSS Styling
import "./gallery.css";

/// Entities
import Card from '../card/card';
import { PokemonListResponse } from './../../entities/pokemon';

const queryClient = new QueryClient(); 

export default function Gallery({ pokemons }: { pokemons: PokemonListResponse[] }) { 
  
  const { selectedPokemonUrl, showInfo, handlePokemonSelect } = usePokemonSelect();

  /** Stage: Map the list of pokemons into card components */
  const PokemonCards =  pokemons.map((pokemon) => { 
    const urlComponent = pokemon.url.split("/");
    const index = urlComponent[urlComponent.length - 2];

    return (
      <Card key = {index}
            name={pokemon.name} 
            url={pokemon.url} 
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
          <Info url={selectedPokemonUrl} handleCloseInfo={handlePokemonSelect} />
        }
      </QueryClientProvider>
    </div>
  )
}
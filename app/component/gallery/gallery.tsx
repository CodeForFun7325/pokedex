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

  // Create pokemon cards using the pokemons array passed as a prop
  const PokemonCards =  pokemons.map((pokemon) => { 
    const urlComponent = pokemon.url.split("/");
    const index = urlComponent[urlComponent.length - 2];

    return (
      <Card key = {index}
            name={pokemon.name} 
            url={pokemon.url} 
            imageSource={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
            onClick={handlePokemonSelect}/>
    ); 
  });
  
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
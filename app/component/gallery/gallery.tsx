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
import Pokemon from './../../entities/pokemon';

const queryClient = new QueryClient(); 

export default function Gallery({ pokemons }: { pokemons: Pokemon[] }) { 
  
  const { selectedPokemonUrl, showInfo, handlePokemonSelect } = usePokemonSelect();

  // Create pokemon cards using the pokemons array passed as a prop
  const PokemonCards =  pokemons.map((pokemon, index) => { 
    return (
      <Card key = {index}
            name={pokemon.name} 
            url={pokemon.url} 
            imageSource={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            onClick={handlePokemonSelect}/>
    ); 
  });

  console.log(selectedPokemonUrl); 
  
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
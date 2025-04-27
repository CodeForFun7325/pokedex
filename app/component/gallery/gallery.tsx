"use client"; 

/// Component Imports
import React, { useState, useCallback } from "react";
import Info from '../info/info';

/// Hook Imports
import usePokemonSelect from '../../hooks/usePokemonSelect';

/// CSS Styling
import "./gallery.css";

/// Entities
import Card from '../card/card';
import Pokemon from './../../entities/pokemon';

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
  
  return (
    <div className="gallery">
      {PokemonCards}
      {showInfo && <Info url={selectedPokemonUrl} handleCloseInfo={handlePokemonSelect} />}
    </div>
  )
}
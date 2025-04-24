"use client"; 
import React, { useState, useCallback } from "react";
import Card from '../card/card';
import Pokemon from './../../entities/pokemon';
import "./gallery.css";


export default function Gallery({ pokemons }: { pokemons: Pokemon[] }) { 
  
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("");
  
  const handlePokemonSelect = useCallback((url: string) => {
    setSelectedPokemonUrl(url);
    console.log(`Selected Pokemon URL: ${url}`); // Log the selected Pokemon URL
  }, []);
  
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
      {PokemonCards} // Render the pokemon cards
    </div>
  )
}
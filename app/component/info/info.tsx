import React, { useEffect } from "react"; 
import ImageCarousel from "./imagecarousel";

// Custom Hooks
import useFetchPokemon from "../../hooks/useFetchPokemon";

/// CSS Styling
import "./info.css"; 

type infoProps = { 
  url: string;
  handleCloseInfo: (url: string) => void; 
}

// Entities
import Pokemon from "../../entities/pokemon";

function Info({ url, handleCloseInfo} : infoProps) 
{

  const data = useFetchPokemon(url);
  const p : Pokemon | null = data == null ? null : data.p;

  /// If no data is returned, show loading text
  /// This is to prevent the main component from rendering before the data is successfully fetched
  if (data == null) { 
    return (
      <div className="info-container">
        <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
        <p className="loading-text">Loading...</p>
      </div>
    );
  } 

  return (
    <div className="info-container">
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
      <div aria-label={`Images of ${p?.name}`} className="image-carousel-container"> 
        <ImageCarousel sprites={p?.sprites || {}} />
      </div>
      <div aria-label={`Informaiton on ${p?.name}`} className="pokemon-info">
        <h2>{p?.name}</h2>
        <p>Type 1: {p?.type1}</p>
        <p>Type 2: {p?.type2}</p>
        <p>Abilities: {p?.abilities.join(", ")}</p>
        <p>Moves: {p?.moves}</p>
      </div>
    </div>
  );
}

export default Info;
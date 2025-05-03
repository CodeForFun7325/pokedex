import React, { useEffect } from "react"; 

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

  console.log("Pokemon", p); 

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
      <>
        <h2>{p?.name}</h2>
        <p>Type 1: {p?.type1}</p>
        <p>Type 2: {p?.type2}</p>
        <p>Moves: {p?.moves}</p>
      </>
    </div>
  );
}

export default Info;
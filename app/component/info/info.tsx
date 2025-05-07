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
        <p className="loading-text">Retrieving Data...</p>
      </div>
    );
  } 

  console.log(p?.abilities); 

  return (
    <div className="info-container">
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
      <div aria-label={`Images of ${p?.name}`} className="image-carousel-container"> 
        <ImageCarousel sprites={p?.sprites || {}} />
      </div>
      <div aria-label={`Informaiton on ${p?.name}`} className="pokemon-info">
        <h2>{p?.name.toUpperCase()}</h2>
        <br />

        <p><strong>Types: </strong>  {p?.type1}{p?.type2 == "" ? "" : ", "}{p?.type2}</p>
        <br />

        <p><strong>Abilities:</strong></p>
        <ul className="abilities"> 
          {
            p?.abilities.map((value, index) => { 
              console.log(value); 
              return(
                <li key={index}>{value}</li>
              ); 
            })
          }
        </ul>
        <br />
        
        <p><strong>Moves:</strong></p>
        <ul className="moves"> 
          {
            p?.moves.map((value, index) => { 
              return(
                <li key={index}>{value}</li>
              ); 
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default Info;
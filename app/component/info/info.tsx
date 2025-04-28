import React from "react"; 

// Custom Hooks
import useFetchPokemon from "../../hooks/useFetchPokemon";

/// CSS Styling
import "./info.css"; 

type infoProps = { 
  url: string;
  handleCloseInfo: (url: string) => void; 
}

function Info({ url, handleCloseInfo} : infoProps) 
{
  const { data } = useFetchPokemon(url);
  console.log(data); 
  
  return (
    <div className="info-container">
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
      <>
        <h2>Pokemon Name</h2>
        <p>Type 1: </p>
        <p>Type 2: </p>
        <p>Description: </p>
        <p>Moves</p>
      </>
    </div>
  );
}

export default Info;
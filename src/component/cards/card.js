import React from "react"; 
import "./card.css";

export default function Card() { 
  return(
    <div className="card-container"> 
      <div className="card"> 
        <div className="card-image">
          <div className="child image-border" />
          <img className="child pokemon-image" src="pokemon/charmander.jpg" alt="charmander" />
        </div>
      </div> 
    </div>
  );
}
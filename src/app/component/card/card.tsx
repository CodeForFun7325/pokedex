"use client";

// Components
import React, { memo } from "react"; 

// Entities
import CardData from "@/src/app/entities/card";

// CSS Styling
import "./card.css";

function Card({name, imageSource, onClick} : CardData) {  
  return (
    <div onClick={() => onClick(name)} className="card"> 
      <img className="pokemon-image" src={imageSource} alt={name}/>
      <h2 className="pokemon-name">{name}</h2>
    </div>
  );
}

export default memo(Card); // Use memo to prevent unnecessary re-renders
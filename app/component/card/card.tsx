"use client";
import React, { useContext } from "react"; 
import CardData from "../../entities/card";
import GalleryContextProvider, { GalleryContext } from "../../contexts/GalleryContext";
import "./card.css";

export default function Card({name, url, imageSource} : CardData) {  

  const {setSelectedPokemonUrl}= useContext(GalleryContext);

  const handleClick = () => { 
    setSelectedPokemonUrl(url); // Update the selected Pokemon in context
  }

  return (
    <div onClick={handleClick} className="card"> 
      <img className="pokemon-image" src={imageSource} alt={name}/>
      <h2 className="pokemon-name">{name}</h2>
    </div>
  );
}

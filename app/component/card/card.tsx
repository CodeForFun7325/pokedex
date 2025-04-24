"use client";
import React, { memo } from "react"; 
import CardData from "../../entities/card";
import "./card.css";

function Card({name, url, imageSource, onClick} : CardData) {  
  return (
    <div onClick={() => onClick(url)} className="card"> 
      <img className="pokemon-image" src={imageSource} alt={name}/>
      <h2 className="pokemon-name">{name}</h2>
    </div>
  );
}

export default memo(Card); // Use memo to prevent unnecessary re-renders
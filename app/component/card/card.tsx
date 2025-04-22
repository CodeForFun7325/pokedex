"use client";
import React, { useState } from "react"; 
import CardData from "../../entities/card";
import "./card.css";

export default function Card({name, url, imageSource} : CardData) { 
  
  return (
    <div className="card"> 
      <img className="pokemon-image" src={imageSource} alt={name}/>
      <h2 className="pokemon-name">{name}</h2>
    </div>
  );
}

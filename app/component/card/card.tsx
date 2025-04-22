"use client";
import React, { useState } from 'react';
import Info from './info/info';

import './card.css'; 

type CardProps = {pokemon: string};

function Card({pokemon}: CardProps) { 

  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => { 
    setShowInfo(true);
  }

  return (
    <>
      {
        !showInfo ? 
          <div onClick={handleClick} className="card"> 
            <img className="pokemon-image" src={imageSource} alt={pokemon}/>
            <h2 className="pokemon-name">{pokemon}</h2>
          </div>
        : 
          <Info setShowInfo={setShowInfo}/>
      }
    </>
  )
}

export default Card; 
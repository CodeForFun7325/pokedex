"use client"; 

// Components
import React, { memo } from "react"; 

// Entities
interface Entry {
    name: string;
    imageSource: string;
    onClick: (url: string) => void;
}

// CSS Styling
import './entry.css'; 

export default function Entry({ name, imageSource, onClick } : Entry) { 
    return (
        <div onClick={() => onClick(name)} className='entry'>
            <img className="pokemon-image" src={imageSource} alt={name} />
            <h2 className="pokemon-name">{name}</h2> 
        </div>
    )
}
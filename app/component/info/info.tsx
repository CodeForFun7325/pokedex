"use client"; 
import Link from "next/link";
import StatsGraph from "./statgraph";
import { useEffect, useState } from "react";

// Custom Hooks
import GetPokemonSightings from "@/app/api/pokemon/getPokemonSightings";

/// CSS Styling
import "./info.css"; 

// Entities
import Pokemon from "../../entities/pokemon";

type infoProps = { 
  pokemon: Pokemon
}

export default function Info({pokemon} : infoProps) 
{
    
  /** Stage = Render the info card once data has been returned */
  return (
    
    <div className="info-container">
      <div aria-label={`Images of ${pokemon.name}`} className="pokemon-attributes"> 
        <Link className="report-btn" href={`/report?pokemon=${pokemon?.name}&id=${pokemon?.id}`}>Report Sighting</Link>
        <br />
        <img className="info-image" src={pokemon?.sprites.image} alt={pokemon?.name} />
        <StatsGraph stats={pokemon?.stats || []}/>
      </div>

      <div aria-label={`Information on ${pokemon?.name}`} className="pokemon-info">
        <p><strong>Types: </strong>  {pokemon?.type1}{pokemon?.type2 == "" ? "" : ", "}{pokemon?.type2}</p>
        <br />

        <p><strong>Abilities:</strong></p>
        <ul className="abilities"> 
          {
            pokemon?.abilities.map((value, index) => { 
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
            pokemon?.moves.map((value, index) => { 
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
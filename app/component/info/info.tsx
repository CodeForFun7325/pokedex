"use client"; 
import Link from "next/link";
import StatsGraph from "./statgraph";
import { useEffect, useState } from "react";

// Custom Hooks
import GetPokemonSightings from "@/app/api/pokemon/getpokemonsightings";

/// CSS Styling
import "./info.css"; 

type infoProps = { 
  pokemon: string;
  handleCloseInfo: (url: string) => void; 
}

// Entities
import Pokemon from "../../entities/pokemon";

function Info({ pokemon, handleCloseInfo} : infoProps) 
{

  /** Stage: Call custom hook to fetch data */
  const [data, setData] = useState<Pokemon>(); 

  useEffect(() => { 
    let pokemonData = GetPokemonSightings(pokemon).then(res => setData(res?.p));
  }, []);

  /** Stage = Render the info card once data has been returned */
  return (
    <div className="info-container">
      {/* Close button */}
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>

      {/* Image carousel */}
      <div aria-label={`Images of ${data?.name}`} className="pokemon-attributes"> 
        <h2>{data?.name.toUpperCase()}</h2>
        <Link className="report-btn" href={`/report?pokemon=${data?.name}&id=${data?.id}`}>Report Sighting</Link>
        <br />
        {/* <ImageCarousel sprites={data?.sprites || {}} /> */}
        <img className="info-image" src={data?.sprites.image} alt="pokemon image" />
        <StatsGraph stats={data?.stats || []}/>
      </div>

      {/* Information section of card */}
      <div aria-label={`Information on ${data?.name}`} className="pokemon-info">
        
        <br />

        <p><strong>Types: </strong>  {data?.type1}{data?.type2 == "" ? "" : ", "}{data?.type2}</p>
        <br />

        <p><strong>Abilities:</strong></p>
        <ul className="abilities"> 
          {
            data?.abilities.map((value, index) => { 
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
            data?.moves.map((value, index) => { 
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
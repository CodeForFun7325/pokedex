"use client"; 
import Link from "next/link";
import ImageCarousel from "./imagecarousel";
import StatsGraph from "./statgraph";

// Custom Hooks
import useFetchPokemon from "../../hooks/useFetchPokemon";

/// CSS Styling
import "./info.css"; 

type infoProps = { 
  url: string;
  handleCloseInfo: (url: string) => void; 
}

// Entities
import Pokemon from "../../entities/pokemon";
import Stats from "@/app/entities/stats";

function Info({ url, handleCloseInfo} : infoProps) 
{

  const data = useFetchPokemon(url);
  const p : Pokemon | null = data == null ? null : data.p;

  /// If no data is returned, show loading text
  /// This is to prevent the main component from rendering before the data is successfully fetched
  if (data == null) { 
    return (
      <div className="info-container">
        <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
        <p className="loading-text">Retrieving Data...</p>
      </div>
    );
  }

  console.log(p); 

  const PokemonStats = p?.stats.map((stat : any) => { 
    const pokemonStat : Stats = { 
      "base_stat": stat.base_stat,  
      "stat": stat.stat.name
    }
    
    return pokemonStat; 
  }); 

  // If data is returned show info card
  return (
    <div className="info-container">
      {/* Close button */}
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>

      {/* Image carousel */}
      <div aria-label={`Images of ${p?.name}`} className="pokemon-attributes"> 
        <ImageCarousel sprites={p?.sprites || {}} />
        <StatsGraph stats={PokemonStats || []}/>
      </div>

      {/* Information section of card */}
      <div aria-label={`Information on ${p?.name}`} className="pokemon-info">
        <div>
          <h2>{p?.name.toUpperCase()}</h2>
          <Link className="report-btn" href="/report">Report Citing</Link>
        </div>
        <br />

        <p><strong>Types: </strong>  {p?.type1}{p?.type2 == "" ? "" : ", "}{p?.type2}</p>
        <br />

        <p><strong>Abilities:</strong></p>
        <ul className="abilities"> 
          {
            p?.abilities.map((value, index) => { 
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
            p?.moves.map((value, index) => { 
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
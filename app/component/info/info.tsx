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

function Info({ url, handleCloseInfo} : infoProps) 
{

  const data = useFetchPokemon(url);
  const p : Pokemon | undefined = data?.p;

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

  // If data is returned show info card
  return (
    <div className="info-container">
      {/* Close button */}
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>

      {/* Image carousel */}
      <div aria-label={`Images of ${p?.name}`} className="pokemon-attributes"> 
        <h2>{p?.name.toUpperCase()}</h2>
        <Link className="report-btn" href={`/report?pokemon=${p?.name}&id=${p?.id}`}>Report Sighting</Link>
        <br />
        <ImageCarousel sprites={p?.sprites || {}} />
        <StatsGraph stats={p?.stats || []}/>
      </div>

      {/* Information section of card */}
      <div aria-label={`Information on ${p?.name}`} className="pokemon-info">
        
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
"use client"; 
import Card from '../card/card';
import Pokemon from './../../entities/pokemon';
import GalleryContextProvider  from "../../contexts/GalleryContext";
import "./gallery.css";


export default function Gallery({ pokemons }: { pokemons: Pokemon[] }) { 

  return (
    <div className="gallery">
      <GalleryContextProvider>
      {
        pokemons.map((pokemon, index) => { 
          return (
            <Card key = {index}
                  name={pokemon.name} 
                  url={pokemon.url} 
                  imageSource={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}/>
          ); 
        })
      }
      </GalleryContextProvider>
    </div>
  )
}
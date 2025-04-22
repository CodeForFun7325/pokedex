import Pokedex from 'pokedex-promise-v2';
import Card from '../card/card';
import Pokemon from './../../entities/pokemon';
import "./gallery.css";


export default async function Gallery() { 
  const P = new Pokedex();

  // At the time of development there were only 1025 pokemon in the national dex
  const response = await P.getPokemonsList({limit: 1025});
  const pokemons = await response.results as Pokemon[];

  if (!pokemons || pokemons.length === 0) {
    return <div className="gallery"></div>;
  }

  return (
    <div className="gallery">
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
    </div>
  )
}
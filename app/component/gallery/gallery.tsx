import './gallery.css'; 
import Pokedex from 'pokedex-promise-v2'; 
import Card from '../card/card';

function Gallery() {

  const p = new Pokedex(); // Initializing Pokedex instance

  var pokemonList = [];
  // Fetch pokemon data and return card components
  const getPokemon = async () => { 
    await p.getPokemonsList({limit: 1025, offset: 0})
      .then((response) => { 
        pokemonList = response.results;
      }); 
  }

  getPokemon(); 

  return (
    <></>
  )
}

export default Gallery;
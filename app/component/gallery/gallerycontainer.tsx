import Gallery from './gallery';
import Pokedex from 'pokedex-promise-v2';
import Pokemon from './../../entities/pokemon';


export default async function GalleryContainer() {
  const P = new Pokedex();

  // At the time of development there were only 1025 pokemon in the national dex
  const response = await P.getPokemonsList({limit: 1025});
  const pokemons = await response.results as Pokemon[];

  if (!pokemons || pokemons.length === 0) {
    return <div className="gallery"></div>;
  }

  return (
    <Gallery pokemons={pokemons}/>
  );

}
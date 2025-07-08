import Pokedex from 'pokedex-promise-v2';
import Gallery from './gallery';

// Entities
import { PokemonListResponse } from '../../entities/pokemon';

export default async function GalleryContainer({ search } : { search: string | ""}) {
  const P = new Pokedex();

  /** Stage: Call the PokeAPI endpoint to retrieve a list of all the pokemons
   * At the time of development there were only 1025 pokemon in the national dex 
   * */
  const response = await P.getPokemonsList({ limit: 1025 });
  var pokemons = response.results as PokemonListResponse[];

  if (!pokemons || pokemons.length === 0) {
    return <div className="gallery"></div>;
  } 

  /** Stage: Filter down what pokemons to display based on the users search input */
  pokemons = pokemons.filter((pokemon) => { 
    return pokemon.name.includes(search);
  });


  /** Stage: Render gallery */
  return (
    <Gallery pokemons={pokemons} />
  );
}
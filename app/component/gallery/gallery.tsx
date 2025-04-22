import './gallery.css'; // Importing CSS for styling the gallery component
import Pokedex from 'pokedex-promise-v2'; // Importing Pokedex library
import { useQuery } from '@tanstack/react-query'; // Importing useQuery for data fetching
import Card from '../card/card'; // Importing Card component to display each Pokémon
import { Pokemon } from '../../entities/pokemon'; // Importing Pokemon interface for type safety

function Gallery() {
  const p = new Pokedex(); // Initializing Pokedex instance

  const fetchPokemon = async (): Promise<Pokemon[]> => {
    const pokemonList = await p.getPokemonsList({ limit: 1025 }); // Fetching a list of Pokémon with a limit of 1025
    console.log(pokemonList.results); 
    return [...pokemonList.results]; 
  }

  const { data: pokemonList, isLoading } = useQuery({
    queryKey: ['pokemonList'], // Unique key for the query
    queryFn: () => fetchPokemon(),
    staleTime: 1000 * 60 * 60, // Data is fresh for 1 hour
    refetchOnWindowFocus: false, // Do not refetch on window focus
  }); 

  if (isLoading) { 
    return <div className="loading">Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="gallery">
      {
        pokemonList?.map((pokemon: Pokemon) => (
          <Card
            key={pokemon.name} // Unique key for each card // Pokémon ID
            pokemon={pokemon.name} // Pokémon name
          />
        ))
      }
    </div>
  );
}

export default Gallery;
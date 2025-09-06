"user client"; 

// Components
import { useState, useCallback} from 'react'; 

export default function usePokemonSelect() { 
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handlePokemonSelect = useCallback((pokemon: string) => {
    setSelectedPokemon(pokemon);
    setShowInfo(pokemon.length != 0); 
  }, []); 

  return { selectedPokemon, showInfo, handlePokemonSelect }
}
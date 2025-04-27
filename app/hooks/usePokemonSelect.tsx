import React, { useState, useCallback} from 'react'; 

export default function usePokemonSelect() { 
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string>("");
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handlePokemonSelect = useCallback((url: string) => {
    setSelectedPokemonUrl(url);
    setShowInfo(url.length != 0); 
  }, []); 

  return { selectedPokemonUrl, showInfo, handlePokemonSelect }
}
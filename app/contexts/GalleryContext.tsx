import React, { createContext, useState } from "react"; 

export const GalleryContext = createContext<{
  selectedPokemonUrl: string;
  setSelectedPokemonUrl: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedPokemonUrl: "",
  setSelectedPokemonUrl: () => {},
});

export default function GalleryContextProvider({ children }: { children: React.ReactNode }) { 
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("");

  return (
    <GalleryContext.Provider value={{ selectedPokemonUrl: selectedPokemonUrl, 
                                      setSelectedPokemonUrl: setSelectedPokemonUrl }}>
      {children}
    </GalleryContext.Provider>
  );
}
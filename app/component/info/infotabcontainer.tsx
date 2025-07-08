"use client"; 
import React, { ChangeEvent, FormEventHandler, JSX, useEffect, useState } from "react"; 
import GlobalLoading from "../loading/loading";

// Custom Hooks
import GetPokemonSightings from "@/app/api/pokemon/getPokemonSightings";
import Info from "./info"; 

import "./infotabcontainer.css"; 

type infoProps = { 
  pokemon: string;
  handleCloseInfo: (url: string) => void; 
}

export default function InfoTabContainer({pokemon, handleCloseInfo} : infoProps) { 

  const infoContainers = new Map<string, JSX.Element>(); 
  const [selectedForm, setSelectedForm] = useState<string>("Base"); 
  const forms:string[] = []; 

  useEffect(() => { 
    const fetchData = async () => { 
      let pokemonData = await GetPokemonSightings(pokemon).then(res => res?.pokemonForms); 
      console.log("pokemon data", pokemonData); 

      pokemonData?.forEach(data => { 
        forms.push(data?.form);
        infoContainers.set(data?.form, <Info pokemon={data} />)
      });
    }

    fetchData(); 
  }, []);

  const handleSelect = (e : React.ChangeEvent<HTMLOptionElement>) => { 
    if (e.target.value === "")
      setSelectedForm("Base");
    else 
      setSelectedForm(e.target.value); 
  }

  console.log("forms", forms); 

  return (
    <div className="info-tab-container">
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
      <select>
        {
          forms.map((form) => {
            return (
              <option key={form} value={form}>
                {form}
              </option>
            );
          })
        }
      </select>
      
    </div>
  )

}
"use client"; 
import React, { JSX, useEffect, useState } from "react"; 
import GlobalLoading from "../loading/loading";

// Custom Hooks
import GetPokemonSightings from "@/app/api/pokemon/getPokemonSightings";
import Info from "./info"; 

import "./infotabcontainer.css"; 
import Pokemon from "@/app/entities/pokemon";

type infoProps = { 
  pokemon: string;
  handleCloseInfo: (url: string) => void; 
}

export default function InfoTabContainer({pokemon, handleCloseInfo} : infoProps) { 

  const [infoContainers, setInfoContainers] = useState<Map<string, JSX.Element>>(new Map()); 
  const [selectedForm, setSelectedForm] = useState<string>("Base"); 
  const [formOptions, setFormOptions] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => { 
    const fetchData = async () => { 
      setLoading(true); 
      let pokemonData : Pokemon[] | undefined = await GetPokemonSightings(pokemon).then(res => res?.pokemonData); 
      let infoElements:Map<string, JSX.Element> = new Map(); 
      let forms:string[] = [];
      
      pokemonData?.forEach(data  => { 
        forms.push(data?.form == "" ? "Base" : data.form);
        infoElements.set(data?.form == "" ? "Base" : data.form, <Info pokemon={data} />)
      });
      
      setFormOptions(forms); 
      setInfoContainers(infoElements); 
      setLoading(false); 
    }
    
    fetchData(); 
  }, []);

  const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => { 
    if (e.target.value === "")
      setSelectedForm("Base");
    else 
      setSelectedForm(e.target.value); 
  }

  if (loading) { 
    return (
      <div className="info-tab-container">
        <GlobalLoading />
      </div>
    )
  }

  return (
    <div className="info-tab-container">
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
      <div className="info-header">
        <h2>{pokemon.toUpperCase()}</h2>
        <label htmlFor="form">Form: </label>
        <select name="form" className="form-option" onChange={handleChange}>
          {
            formOptions.map((form) => {
              return (
                <option key={form} value={form}>
                  {form}
                </option>
              );
            })
          }
        </select>
      </div>
      {
        infoContainers.get(selectedForm)
      }
      
    </div>
  )

}
"use client"; 
import React, { ChangeEvent, FormEventHandler, JSX, useEffect, useState } from "react"; 
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

  useEffect(() => { 
    const fetchData = async () => { 
      let pokemonData : Pokemon[] | undefined = await GetPokemonSightings(pokemon).then(res => res?.pokemonData); 
      let infoElements:Map<string, JSX.Element> = new Map(); 
      let forms:string[] = [];

      pokemonData?.forEach(data  => { 
        forms.push(data?.form == "" ? "Base" : data.form);
        infoElements.set(data?.form == "" ? "Base" : data.form, <Info pokemon={data} />)
      });

      setFormOptions(forms); 
      setInfoContainers(infoElements); 
    }

    fetchData(); 
  }, []);

  const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => { 
    if (e.target.value === "")
      setSelectedForm("Base");
    else 
      setSelectedForm(e.target.value); 
  }

  return (
    <div className="info-tab-container">
      <span onClick={() => handleCloseInfo("")} className="close-btn">&times;</span>
      <label></label>
      <select className="form-option" onChange={handleChange}>
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
      {
        infoContainers.get(selectedForm)
      }
      
    </div>
  )

}
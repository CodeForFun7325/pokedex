"use client"; 
import React, { useState } from 'react'; 
import { useSearchParams } from 'next/navigation';

import './pokemonform.css';

export default function PokemonForm({moves, abilities, types} : {moves: any[], abilities: any[], types: any[]}) { 
  const maxTypes = 2; // A Pokemon can have a maximum of 2 types
  const maxAbilities = 1; // A pokemon can have a maximum of 1 ability

  const searchParams = useSearchParams();
  const [image, setImage] = useState<string | null>(null); 
  const [checkedMoves, setCheckedMoves] = useState<string[]>([]); // Array of selected moves
  const [checkedAbilities, setCheckedAbilities] = useState<string[]>([]); // Array of selected abilities
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]); // Array of selected types

  const setImageOnChange = (e : React.ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0]; 

    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => setImage(reader.result as string); 
      reader.readAsDataURL(file); 
    }
  }

  let pokemonName : string | null = searchParams.get('pokemon');
  pokemonName = pokemonName ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) : ""; 

  types.sort((typeA, typeB) => typeA.name.localeCompare(typeB.name));
  types = types.map((type) => {
    return (
      <div className="type-option" key={type.name}>
        <input type="checkbox" name={type.name} value={type.name}/>
        <label className="checkbox-label" htmlFor={type.name}>{type.name}</label>
        <br />
      </div>
    );
  });

  abilities.sort((abilityA, abilityB) => abilityA.name.localeCompare(abilityB.name));
  abilities = abilities.map((ability) => {
    return (
      <div className="ability-option" key={ability.name}>
        <input type="checkbox" name={ability.name} value={ability.name}/>
        <label className="checkbox-label" htmlFor={ability.name}>{ability.name}</label>
        <br />
      </div>
    );
  });

  moves.sort((moveA, moveB) => moveA.name.localeCompare(moveB.name));
  moves = moves.map((move) => {
    return (
      <div className="move-option" key={move.name}>
        <input type="checkbox" name={move.name} value={move.name}/>
        <label className="checkbox-label" htmlFor={move.name}>{move.name}</label>
        <br />
      </div>
    );
  });

  const handleTypeCheck = (e : React.ChangeEvent<HTMLInputElement>) => {

  }; 

  const handleAbilitiiesCheck = (e : React.ChangeEvent<HTMLInputElement>) => {

  }

  const handleMovesCheck = (e : React.ChangeEvent<HTMLInputElement>) => {

  }

  return (
    <div className="report-form">
      {/* Image Upload Section */}
      <form className="image-upload">
        <h2>{pokemonName} Image</h2>
        <br />
        {image && <img src={image} alt="Uploaded image preview" id="imagePreview" />}
        <input type="file" id="imageUpload" accept="image/*" onChange={setImageOnChange}/>
      </form>

      <br />

      {/* Pokemon Details */}
      <form className="pokemon-details"> 
        <h2>{pokemonName} Details</h2>
        <br />

        <label htmlFor="form">Form: </label>
        <input id="form" type="text" name="form"/>
        <br /> 
        
        <label>Types: </label>
        <div className="types-list">
          {types}
        </div>
        <br />

        <label>Abilities: </label>
        <div className="abilities-list">
          {abilities}
        </div>

        <label>Moves:</label>
        <div className="moves-list">
          {moves}
        </div>
      </form> 
    </div>
  );
}
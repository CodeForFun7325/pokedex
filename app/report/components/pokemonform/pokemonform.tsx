"use client"; 
import React, { useState } from 'react'; 
import { useSearchParams } from 'next/navigation';

import PostPokemonSighting from '@/app/api/postPokemonSighting';
import Pokemon from '@/app/entities/pokemon';

import './pokemonform.css';

export default function PokemonForm({moves, abilities, types} : {moves: any[], abilities: any[], types: any[]}) { 
  const maxTypes = 2; // A Pokemon can have a maximum of 2 types
  const maxAbilities = 1; // A pokemon can have a maximum of 1 ability

  const searchParams = useSearchParams();
  const [form, setForm ] = useState<string>(""); 
  const [image, setImage] = useState<string | null>(null); 
  const [checkedMoves, setCheckedMoves] = useState<string[]>([]); // Array of selected moves
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]); // Array of selected types
  const [checkedAbilities, setCheckedAbilities] = useState<string>(""); // Array of selected abilities

  // Sets the image state when a file is selected
  const setImageOnChange = (e : React.ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0]; 

    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => setImage(reader.result as string); 
      reader.readAsDataURL(file); 
    }
  }

  // Capitalizes the first letter of the pokemon name from the search params
  let pokemonName : string | null = searchParams.get('pokemon');
  pokemonName = pokemonName ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) : ""; 

  let pokemonIdString : string | null = searchParams.get('id');
  let pokemonId : number = pokemonIdString ? parseInt(pokemonIdString) : 0; // Parse the pokemon ID from the search params

  // Handles the change event for the checkboxes
  // The functions check if the maximum number of types or abilities has been reached
  // Updates the state of checked moves, abilities, and types, and pokemon form
  const handleTypeCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {                                 // if we are checking the checkbox
      if (checkedTypes.length < maxTypes) {                 // chec if the max types has been reached
        setCheckedTypes([...checkedTypes, e.target.value]);
      } else {
        e.target.checked = false; // Uncheck the checkbox
        alert(`You can only select up to ${maxTypes} types.`);
      }
    } else { // we are unchecking the checkbox and removing the type from the checked types
      setCheckedTypes(checkedTypes.filter((type) => type !== e.target.value)); 
    }
  }; 

  const handleAbilitiiesCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (checkedAbilities == "") { // If an ability has not been selected yet
        setCheckedAbilities(e.target.value);
      } else {
        e.target.checked = false; // Uncheck the checkbox
        alert(`You can only select up to ${maxAbilities} abilities.`);
      }
    } else { 
      setCheckedAbilities(""); 
    }
  }

  const handleMovesCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedMoves([...checkedMoves, e.target.value]);
    } else {
      setCheckedMoves(checkedMoves.filter((move) => move !== e.target.value));
    }
  }

  const handleFormChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value); // Update the form state with the input value;
  }

  // Sort the moves, abilities, and types alphabetically
  // Map the moves, abilities, and types to create a list of checkboxes
  types.sort((typeA, typeB) => typeA.name.localeCompare(typeB.name));
  types = types.map((type) => {
    return (
      <div className="type-option" key={type.name}>
        <input type="checkbox" name={type.name} value={type.name} onChange={handleTypeCheck}/>
        <label className="checkbox-label" htmlFor={type.name}>{type.name}</label>
        <br />
      </div>
    );
  });

  abilities.sort((abilityA, abilityB) => abilityA.name.localeCompare(abilityB.name));
  abilities = abilities.map((ability) => {
    return (
      <div className="ability-option" key={ability.name}>
        <input type="checkbox" name={ability.name} value={ability.name} onChange={handleAbilitiiesCheck}/>
        <label className="checkbox-label" htmlFor={ability.name}>{ability.name}</label>
        <br />
      </div>
    );
  });

  moves.sort((moveA, moveB) => moveA.name.localeCompare(moveB.name));
  moves = moves.map((move) => {
    return (
      <div className="move-option" key={move.name}>
        <input type="checkbox" name={move.name} value={move.name} onChange={handleMovesCheck}/>
        <label className="checkbox-label" htmlFor={move.name}>{move.name}</label>
        <br />
      </div>
    );
  });

  // When the upload button is clicked, we call the PostPokemonSighting function
  // with the selected types, id, pokemon name, form, abilities, moves, and an empty sprites object
  const handleUploadClick = () => { 
    const pokemonObject : Pokemon = { 
      name: pokemonName, 
      type1: checkedTypes.length > 0 ? checkedTypes[0] : "", 
      type2: checkedTypes.length > 1 ? checkedTypes[1] : "",
      form: form, 
      id: pokemonId, 
      abilities: [checkedAbilities], 
      stats: [], 
      moves: checkedMoves, 
      sprites: {}
    }

    PostPokemonSighting(pokemonObject);
  }

  return (
    <>
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
          <input id="form" type="text" name="form" onChange={handleFormChange}/>
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
      <button className="upload-button" onClick={handleUploadClick}>Upload Data</button>
    </>
  );
}
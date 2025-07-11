"use client"; 
import React, { useState, useRef, JSX } from 'react'; 
import { useSearchParams, useRouter } from 'next/navigation';


import PostPokemonSighting from '@/app/api/pokemon/postPokemonSightings';
import Pokemon from '@/app/entities/pokemon';
import FormLoading from '../loading/formloading';

import './pokemonform.css';

export default function PokemonForm(
  {moves, abilities, types} : {moves: unknown, abilities: unknown, types: unknown}
) { 

  /**
   * Stage: Initialize router hook
   */
  const route = useRouter(); 

  /** 
   * Stage: Initialize search params to get the pokemon name and id from the URL
   * The pokemon name is used to display the pokemon's name in the form
   * The pokemon id is used to identify the pokemon in the database
  */
  const searchParams = useSearchParams();
  
  let pokemonName : string | null = searchParams.get('pokemon'); 
  pokemonName = pokemonName ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) : ""; // Capitalize the first letter of the pokemon name
  
  let pokemonIdString : string | null = searchParams.get('id');
  let pokemonId : number = pokemonIdString ? parseInt(pokemonIdString) : 0; // Parse the pokemon ID from the search params



  /**
   * Stage: Initialize constants for the maximum number of types and abilities a pokemon can have
   * Each pokemon can have a maximum of 2 types and 1 ability
   * The form will enforce these limits by disabling the checkboxes when the maximum is reached
  */
  const maxTypes = 2; // A Pokemon can have a maximum of 2 types
  const maxAbilities = 1; // A pokemon can have a maximum of 1 ability

  const [image, setImage] = useState<string>(""); // Image of pokemon sighting

  const [fileType, setFileType] = useState<string>(""); // Set the file type. This is used to post files to azure storage account

  const [loadingState, setLoadingState] = useState<boolean>(false); // If true, application will display a loading component

  const refFormInput = useRef<HTMLInputElement>(null); // Reference to the form input field

  const refHP = useRef<HTMLInputElement>(null); 
  const refAttack = useRef<HTMLInputElement>(null); 
  const refDefense = useRef<HTMLInputElement>(null); 
  const refSpecialAttack = useRef<HTMLInputElement>(null); 
  const refSpecialDefense = useRef<HTMLInputElement>(null); 
  const refSpeed = useRef<HTMLInputElement>(null); 
  
  const refCheckedTypes = useRef<Set<string>>(new Set()); // Reference to a set of checked types
  
  const refCheckedAbility = useRef<string>(""); // Reference to the checked ability
  
  const refCheckedMoves = useRef<Set<string>>(new Set()); // Refernece to a set of checked moves

  /** 
   * Stage: Initialize the image upload functionality
   * When the user selects an image file, we read it and set the image state to the base64 encoded string
   * This will allow us to display a preview of the image in the form  
  */
  const setImageOnChange = (e : React.ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0]; 

    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => { 
        setImage(reader.result as string); 
        setFileType(file.type); 
      }; 
      reader.readAsDataURL(file); 
    }
  }

  /** 
   * Stage = Initialize handle functions for checkboxes
   * These functions will handle the checking and unchecking of the checkboxes for types, moves, and abilities
   * They will also enforce the maximum number of types and abilities a pokemon can have
   * If the user tries to check more than the maximum, an alert will be shown and the checkbox will be unchecked
  */
  const handleTypeCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && refCheckedTypes.current.size < maxTypes) { 
      refCheckedTypes.current.add(e.target.value); // Add the type to the set of checked types
    }
    else if (e.target.checked && refCheckedTypes.current.size >= maxTypes) {
      e.target.checked = false; // Uncheck the checkbox
      alert(`You can only select up to ${maxTypes} types.`);
    }
    else { 
      refCheckedTypes.current.delete(e.target.value); // Remove the type from the set of checked types
    }
  }

  const handleMovesCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) 
      refCheckedMoves.current.add(e.target.value); // Add the move to the set of checked moves
    else 
      refCheckedMoves.current.delete(e.target.value); // Remove the move from the set of checked moves
  }

  const handleAbilityCheck = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && refCheckedAbility.current === "") { 
      refCheckedAbility.current = e.target.value; // Set the checked ability
    } else if (e.target.checked && refCheckedAbility.current !== "") {
      e.target.checked = false; // Uncheck the checkbox
      alert(`You can only select up to ${maxAbilities} ability.`);
    } else { 
      refCheckedAbility.current = ""; // Reset the checked ability
    }
  }

  /**
   * Stage: Sort the types, abilities, and moves alphabetically and map them to checkbox elements
   * This will allow us to display the types, abilities, and moves in a user-friendly manner
   */
  function sortArrays(
    arrayContent: string,
    pArray : unknown, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ): JSX.Element[] { 

    let checkboxes: JSX.Element[] = [];

    if (pArray && Array.isArray(pArray) && pArray.length > 0) { 

      let arrFirstElement = pArray[0];

      // we are going to assume that all the variables in this 
      // array have the same type as the first element
      if (arrFirstElement && arrFirstElement instanceof Object) { 
        if ("name" in arrFirstElement && typeof arrFirstElement.name === "string") {
          pArray.sort((element1, element2) => element1.name.localeCompare(element2.name));
          checkboxes = pArray.map((type) => {
            return (
              <div className={`checkbox-container ${arrayContent}-option`} key={type.name}>
                <input className="checkbox" type="checkbox" name={type.name} value={type.name} onChange={handleChange}/>
                <label className="checkbox-label" htmlFor={type.name}>{type.name}</label>
                <br />
              </div>
            );
          });
        }
      }
    }
    return checkboxes;
  }

  let typeCheckboxes = sortArrays("types", types, handleTypeCheck); 
  let abilityCheckboxes = sortArrays("abilities", abilities, handleAbilityCheck); 
  let movesCheckboxes = sortArrays("moves", moves, handleMovesCheck); 

  
  /**
   * Stage: Handle the upload button click
   * This function will create a Pokemon object with the selected types, id, pokemon name, 
   * form, abilities, moves, and an empty sprites object.
   * 
   * It will then call the PostPokemonSighting function to upload the pokemon sighting data to our azure cosmos db
   */
  const handleUploadClick = async () => { 

    if (refFormInput.current === null || refFormInput.current.value === "") { 
      alert("Please enter a name for this pokemon form");
      return; 
    }

    if (refCheckedAbility.current === "") {
      alert("Please select an ability for this pokemon");
      return;
    }

    if (refCheckedMoves.current.size === 0) {
      alert("Please select at least one move for this pokemon");
      return;
    }

    if (refCheckedTypes.current.size === 0) {
      alert("Please select at least one type for this pokemon");
      return;
    }

    if (image === null) {
      alert("Please upload an image for this pokemon");
      return;
    }

    const pokemonObject : Pokemon = { 
      name: pokemonName, 
      type1: [...refCheckedTypes.current].length > 0 ? [...refCheckedTypes.current][0] : "", 
      type2: [...refCheckedTypes.current].length > 1 ? [...refCheckedTypes.current][1] : "",
      form: refFormInput.current?.value || "", 
      id: pokemonId, 
      abilities: [refCheckedAbility.current], 
      stats: [
        {base_stat: parseInt(refHP.current?.value || "0"), statDecode: "HP"},
        {base_stat: parseInt(refAttack.current?.value || "0"), statDecode: "Atk"},
        {base_stat: parseInt(refDefense.current?.value || "0"), statDecode: "Def"},
        {base_stat: parseInt(refSpecialAttack.current?.value || "0"), statDecode: "Sp. Atk"},
        {base_stat: parseInt(refSpecialDefense.current?.value || "0"), statDecode: "Sp. Def"},
        {base_stat: parseInt(refSpeed.current?.value || "0"), statDecode: "Spd"}
      ], 
      moves: [...refCheckedMoves.current], 
      sprites: { image }
    }

    setLoadingState(true); 
    const status = await PostPokemonSighting(pokemonObject, fileType);
    setLoadingState(false); 

    if (status) { 

      alert(status.message); 

      // If the submission was successful then we redirect the user back to the homepage
      // Otherwise, we do nothing. We want to give the user the chance to make changes
      if (status.success) { 
        route.replace("/"); 
      }

    }
  }
  
  /**
   * Stage: Render the Pokemon Form
   */
  return (
    <>
      { loadingState && <FormLoading />}
      <h1>Report Pokemon Sighting</h1>
      <div className="report-form">
        {/* Image Upload Section */}
        <div className="image-upload-section">
          <form className="image-upload-form">
            <h2>{pokemonName} Image</h2>
            <br />
            {image && <img src={image} alt="Uploaded image preview" id="image-preview" />}
            <input type="file" id="imageUpload" accept="image/*" onChange={setImageOnChange}/>
          </form>
        </div>

        <br />

        {/* Pokemon Details */}
        <div className="pokemon-details-section">
          <form className="pokemon-details-form"> 
            <h2>{pokemonName} Details</h2>
            <br />

            <label htmlFor="form">Form: </label>
            <input ref={refFormInput} id="form" type="text" name="form"/>
            <br /> 

            <h3>Stats</h3>
            <div className="stats-container">
              <div className="stat-container">
                <label htmlFor="HP">HP: </label>
                <input ref={refHP} name="HP" type="number" min="0" max="255" step="1" defaultValue="50"/>
              </div>

              <div className="stat-container">
                <label htmlFor="Attack">Attack: </label>
                <input ref={refAttack} name="Attack" type="number" min="0" max="255" step="1" defaultValue="50"/>
              </div>

              <div className="stat-container">
                <label htmlFor="Defense">Defense: </label>
                <input ref={refDefense} name="Defense" type="number" min="0" max="255" step="1" defaultValue="50"/>
              </div>
                
              <div className="stat-container">
                <label htmlFor="Sp.Atk">Special Attack: </label>
                <input ref={refSpecialAttack} name="Sp.Atk" type="number" min="0" max="255" step="1" defaultValue="50"/>
              </div>

              <div className="stat-container">
                <label htmlFor="Sp.Def">Special Defense: </label>
                <input ref={refSpecialDefense} name="Sp.Def" type="number" min="0" max="255" step="1" defaultValue="50"/>
              </div>

              <div className="stat-container">
                <label htmlFor="Speed">Speed: </label>
                <input ref={refSpeed} name="Speed" type="number" min="0" max="255" step="1" defaultValue="50"/>
              </div>
            </div>

            <br /> 

            <h3>Types: </h3>
            <div className="types-list">
              {typeCheckboxes}
            </div>
            <br />

            <h3>Abilities: </h3>
            <div className="abilities-list">
              {abilityCheckboxes}
            </div>

            <h3>Moves:</h3>
            <div className="moves-list">
              {movesCheckboxes}
            </div> 
          </form> 
        </div>
      </div>

      <button className="upload-button" onClick={handleUploadClick}>Upload Data</button>
    </>
  );
}
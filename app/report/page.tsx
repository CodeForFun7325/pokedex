"use client"; 

import React, { useState } from "react";

import "./page.css"; 

export default function ReportCiting() { 
  const [image, setImage] = useState<string | null>(null); 

  const setImageOnChange = (e : React.ChangeEvent<HTMLInputElement>) => { 
    const file = e.target.files?.[0]; 

    if (file) { 
      const reader = new FileReader(); 
      reader.onloadend = () => setImage(reader.result as string); 
      reader.readAsDataURL(file); 
    }
  }

  return (
    <>
      <h1>Report Pokemon Citing</h1>
      <div className="report-form">

        {/* Image Upload Section */}
        <form className="image-upload">
          <h2>Image</h2>
          <br />
          {image && <img src={image} alt="Uploaded image preview" id="imagePreview" />}
          <input type="file" id="imageUpload" accept="image/*" onChange={setImageOnChange}/>
        </form>

        <br />

        {/* Pokemon Details */}
        <form className="pokemon-details"> 
          <h2>Pokemon Details</h2>
          <br />
          <label htmlFor="name">Pokemon: </label>
          <input id="name" type="text" name="name"/>
        </form> 
      </div>
    </>
  ); 
}
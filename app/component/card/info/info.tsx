"use client";
import React from "react"; 

import "./info.css"; // Importing the CSS file for styling

function Info({ setShowInfo }: { setShowInfo: React.Dispatch<React.SetStateAction<boolean>> }) {

  const closeInfo = () => { 
    setShowInfo(false); 
  }

  return (
    <div className="info-container">
      <span onClick={closeInfo} className="close-btn">&times;</span>
      <h2>Pokemon Name</h2>
      <p>Type 1: </p>
      <p>Type 2: </p>
      <p>Description: </p>
      <p>Moves</p>
    </div>
  );
}

export default Info;
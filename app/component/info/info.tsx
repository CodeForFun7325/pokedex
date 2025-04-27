import React from "react"; 

import "./info.css"; // Importing the CSS file for styling

type infoProps = { 
  url: string;
  handleCloseInfo: (url: string) => void; 
}

function Info({ url, handleCloseInfo} : infoProps) 
{
  const handleClick = () => { 
    handleCloseInfo(""); // Close the info by passing an empty string
  }

  return (
    <div className="info-container">
      <span onClick={handleClick} className="close-btn">&times;</span>
      <>
        <h2>Pokemon Name</h2>
        <p>Type 1: </p>
        <p>Type 2: </p>
        <p>Description: </p>
        <p>Moves</p>
      </>
    </div>
  );
}

export default Info;
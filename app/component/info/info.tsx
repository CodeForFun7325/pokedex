"use client"; 

import "./info.css";

export default function Info() { 
  console.log("rendering info"); // Log to see when the info component is rendered

  return (
    <div className="info">
      <h1>Pokemon Info</h1>
      <p>Select a Pokemon to see its details.</p>
    </div>
  );
}
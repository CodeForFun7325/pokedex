import React from 'react'; 
import './card.css'; 


function Card(props) { 
  return (
    <div className="card"> 
      <img className="pokemon-image" src={props.imageSource} alt={props.pokemon}/>
      <h2 className="pokemon-name">{props.pokemon}</h2>
    </div>
  )
}

export default Card; 
import React from 'react'; 

import './gallery.css';
import Card from '../card';

export default function Gallery() { 
  return(
    <div className="gallery-container"> 
      <div className="gallery"> 
        <Card />
      </div> 
    </div>
  );
}
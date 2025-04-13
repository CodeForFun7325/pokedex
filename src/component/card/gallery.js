import React from 'react'; 
import Card from './card';

import './gallery.css'; 

function Gallery() { 
  return(
    <div className="gallery"> 
      <Card pokemon="charmander" imageSource="pokemon/charmander.jpg" />
    </div>
  )
}

export default Gallery;
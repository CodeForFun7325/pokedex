"use client"; 
import { useState } from "react"; 
import "./imagecarousel.css";

export default function ImageCarousel({ sprites }: { sprites: {} }) { 

  const [activeSlideIndex, setActiveSlideIndex] = useState(0); 

  // parse sprites object into multiple image elements
  let spriteImages = Object.entries(sprites)
    .filter(([_, value]) => typeof value === "string")
    .map(([key, value], index) => {
      console.log(value); 
      return (
        <li className={index == activeSlideIndex ? "slide show" : "slide"} key={key}> 
          <img src={value as string} alt={key} className="sprite-image" />
        </li>
      );
    });

  // On-click event functions to move to the previous image
  const handlePrevClick = () => { 
    let newIndex : number = activeSlideIndex - 1; 
    
    // If we are trying to go beyond the first slide, loop back to the last slide
    if (newIndex < 0) 
      setActiveSlideIndex(spriteImages.length - 1);    
    // Otherwise continue moving backwards
    else
      setActiveSlideIndex(newIndex); 
  }

  // On-click event functions to move to the next image
  const handleNextClick = () => { 
    let newIndex : number = activeSlideIndex + 1; 
    
    // if we are trying to move past the last slide, loop back to the beginning
    if (newIndex >= spriteImages.length)
      setActiveSlideIndex(0); 
    // Otherwise continue moving forward
    else 
      setActiveSlideIndex(newIndex); 
  }

  return (
    <div className="image-carousel">
      <button className="carousel-button prev" onClick={handlePrevClick}>&#x27F5;</button>
      <button className="carousel-button next" onClick={handleNextClick}>&#x27F6;</button>
      <ul> 
        {spriteImages}
      </ul>
    </div>
  );

}
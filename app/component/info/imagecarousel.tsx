"use client"; 
import { useState } from "react"; 
import "./imagecarousel.css";

export default function ImageCarousel({ sprites }: { sprites: {} }) { 

  const [activeSlideIndex, setActiveSlideIndex] = useState(0); 

  /** Stage: Map the object of images into an array of list item elements with child image components */ 
  let spriteImages = Object.entries(sprites)
    .filter(([_, value]) => typeof value === "string")
    .map(([key, value], index) => {
      return (
        <li className={index == activeSlideIndex ? "slide show" : "slide"} key={key}> 
          <img src={value as string} alt={key} className="sprite-image" />
        </li>
      );
    });

  /** Stage: Event handler function to move to the previous/next image when the user clicks the arrows */
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
      <button className="carousel-button prev" onClick={handlePrevClick}>&#706;</button>
      <button className="carousel-button next" onClick={handleNextClick}>&#707;</button>
      <ul> 
        {spriteImages}
      </ul>
    </div>
  );

}
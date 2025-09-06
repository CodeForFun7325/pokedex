"use client"; 

// Components
import React from "react"; 
import { RingLoader } from "react-spinners";

export default function GlobalLoading() { 
  return (
    <RingLoader
     loading={true} 
     size={150}
     color="#FFFFFF" 
     speedMultiplier={1}
      cssOverride={{
        position: "absolute",
        top: "50%", 
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    />
  )
} 
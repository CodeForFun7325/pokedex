"use client";

// Components
import GlobalLoading from "@/src/app/component/loading/loading"; 

// CSS Styling
import "./formloading.css"; 

export default function FormLoading() { 

  return (
    <div className="loading-overlay">
      <GlobalLoading />
    </div>
  ); 
}
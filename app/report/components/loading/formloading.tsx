"use client";

import GlobalLoading from "@/app/component/loading/loading"; 

import "./formloading.css"; 

export default function FormLoading() { 

  return (
    <div className="loading-overlay">
      <GlobalLoading />
    </div>
  ); 
}
"use client"; 
import React from 'react'; 
import { useQuery } from '@tanstack/react-query';

export default function useFetchPokemon(url: string) { 
  const { data, isFetching } = useQuery({
    queryKey: ['pokemon', url], 
    queryFn: async () => { 
      const response = await fetch(url); 
      if (!response.ok) { 
        throw new Error('Network response was not ok'); 
      } 
      return response.json(); 
    }, 
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  }); 

  return { data, isFetching }; 
}

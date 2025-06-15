import Stats from "./stats";

export default interface Pokemon { 
  name: string;
  type1: string;
  type2: string; 
  form: string;
  id: number; 
  abilities: string[];
  stats: Stats[];
  moves: string[];
  sprites: {};
}

export interface PokemonListResponse {
  name: string; 
  url: string; 
}

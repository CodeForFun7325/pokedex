export default interface Pokemon { 
  name: string;
  type1: string;
  type2: string; 
  id: number; 
  moves: string[];
}

export interface PokemonListResponse {
  name: string; 
  url: string; 
}
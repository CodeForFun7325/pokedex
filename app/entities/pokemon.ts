export default interface Pokemon { 
  name: string;
  type1: string;
  type2: string; 
  id: number; 
  abilities: string[];
  stats: {}[];
  moves: string[];
  sprites: {};
}

export interface PokemonListResponse {
  name: string; 
  url: string; 
}
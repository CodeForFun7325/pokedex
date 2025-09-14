import Stats from "@/src/app/entities/stats";

export default interface Pokemon {
    name: string;
    type1: string;
    type2: string;
    form: string;
    id: number;
    abilities: string[];
    stats: Stats[];
    moves: string[];
    sprites: { image: string | undefined };
}

export interface PokemonListResponse {
    name: string;
    url: string;
}

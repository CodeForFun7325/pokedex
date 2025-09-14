export default interface Stats {
    base_stat: number;
    statDecode: string | "";
}

interface StatsDecodeMap {
    [key: string]: string
}

export const statsDecodeMap: StatsDecodeMap = {
    "hp": "HP",
    "attack": "Atk",
    "defense": "Def",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    "speed": "Spd"
};
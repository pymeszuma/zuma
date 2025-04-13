export interface TemaWithRatings {
  empresaRating: number;
  interesRating: number;
}

export interface SectorData {
  [tema: string]: TemaWithRatings;
}

export interface MaterialityData {
  [sector: string]: SectorData;
}

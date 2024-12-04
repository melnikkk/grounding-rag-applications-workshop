export interface MovieDocument {
    text: string;
    metadata: MovieMetadata;
  }
  
  export interface MovieMetadata {
    isAdult: boolean;
    chunk: number;
    original_language: string;
    popularity: number;
    posterPath: string;
    releaseDate: string;
    title: string;
    vote_average: number;
    vote_count: number;
  }
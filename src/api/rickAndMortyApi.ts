import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

export interface PaginatedCharacters {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number = 1): Promise<PaginatedCharacters> => {
  try {
    const response = await axios.get<PaginatedCharacters>(`${BASE_URL}/character?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch characters: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  try {
    const response = await axios.get<Character>(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch character: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

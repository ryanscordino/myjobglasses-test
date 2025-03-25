import {
  ApiResponse,
  Character,
  CharacterFilter,
  Episode,
  Info,
} from "./rickAndMortyAPI.types";

const BASE_URL: string = "https://rickandmortyapi.com/api";

export const getOneCharacters = async <T>(
  id: string
): Promise<Character | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
  return;
};

export const getAllCharacters = async <T>(
  page_number: string,
  filter?: CharacterFilter
): Promise<Info<T> | undefined> => {
  let url = `${BASE_URL}/character/?page=${page_number}`;
  if (filter) {
    for (const [k, v] of Object.entries(filter)) {
      url += `&${k}=${v}`;
    }
  }
  try {
    const response = await fetch(url);
    if (response.status == 404) {
      return { not_found: true };
    }
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
  return;
};

export const getRandomsCharacters = async <T>(): Promise<
  ApiResponse<T> | undefined
> => {
  const randomArrayNumbers = (): number[] => {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 800));
  };

  try {
    const response = await fetch(
      `${BASE_URL}/character/${randomArrayNumbers().toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (e) {
    console.error(e);
  }
  return;
};

export const getEpisodeByID = async <T>(
  episode: string
): Promise<ApiResponse<T> | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/episode/${episode}`);
    if (!response.ok) {
      throw new Error(
        `Error while gettting the episode, status: ${response.status}`
      );
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
  return;
};

export const getEpisodeByURL = async <T>(
  url: string
): Promise<Episode | undefined> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Not able to find this episode, status: ${response.status}`
      );
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
  return;
};

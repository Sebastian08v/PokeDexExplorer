// Base URL as a constant to avoid repeating it
const BASE_URL = 'https://pokeapi.co/api/v2';

// The list gives each Pokémon as a URL like ".../pokemon/1/"; the id is the last segment
function extractIdFromUrl(url) {
  const segments = url.split('/').filter(Boolean);
  return Number(segments[segments.length - 1]);
}

// Fetch with async/await, checking response.ok before response.json()
export async function fetchPokemonList(limit = 20, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.results.map((item) => ({
    id: extractIdFromUrl(item.url),
    name: item.name,
  }));
}

// A 404 returns plain text, so response.ok is checked before response.json()
export async function fetchPokemonDetail(nameOrId) {
  const query = String(nameOrId).trim().toLowerCase();
  const response = await fetch(`${BASE_URL}/pokemon/${query}`);

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}


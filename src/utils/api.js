export async function fetchData(endpoint, array_size = 20) {
  return fetch(
    `https://pokeapi.co/api/v2${endpoint}/?limit=${array_size}&offset=0`
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
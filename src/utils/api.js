export const fetchData = async (endpoint, arraySize = 151, arrayStartPoint = 0) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2${endpoint}/?limit=${arraySize}&offset={arrayStartPoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

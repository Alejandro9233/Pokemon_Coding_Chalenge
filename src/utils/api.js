export const fetchData = async (endpoint, array_size = 20) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2${endpoint}/?limit=${array_size}&offset=0`);
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

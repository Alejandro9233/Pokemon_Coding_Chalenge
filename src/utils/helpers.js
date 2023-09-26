export function sortData(data, sort) {
  // TODO: Implement the sorting logic
  return data;
}

export function filterData(data, filter) {
  const filteredPokemon = data.filter((p) => p.name.includes(filter));
  return filteredPokemon;
}

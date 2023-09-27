export function sortData(data, key) {
  if (key.includes('name')) {
    return sortDataByName(data, key);
  } else if (key.includes('id')) {
    return sortDataByID(data, key);
  }
}

function sortDataByName(data, key) {
  const isDescending = key.startsWith('-');
  const sortKey = isDescending ? key.substr(1) : key;
  return data.sort((a, b) => {
    const nameA = a[sortKey].toUpperCase();
    const nameB = b[sortKey].toUpperCase();
    if (nameA < nameB) {
      return isDescending ? 1 : -1;
    }
    if (nameA > nameB) {
      return isDescending ? -1 : 1;
    }
    return 0;
  });
}

function sortDataByID(data, key) {
  if (key === '-id') {
    return data.slice().reverse();
  } else {
    return data;
  }
}



export function filterData(data, filter) {
  const filteredPokemon = data.filter((p) => p.name.includes(filter));
  return filteredPokemon;
}

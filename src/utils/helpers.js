export const sortData = (data, key) => {
  if (key.includes('name')) {
    return sortDataByName(data, key);
  } else if (key.includes('id')) {
    return sortDataByID(data, key);
  }
};

const sortDataByName = (data, key) => {
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
};

const sortDataByID = (data, key) => {
  if (key.startsWith('-')) {
    return data.slice().reverse();
  } else {
    return data;
  }
};

export const filterDataByName = (data, filter) => {
  const filteredPokemon = data.filter((p) => p.name.includes(filter));
  return filteredPokemon;
};

export const filterDataByIndex = (data, index) => {
  if (index === '') {
    return data;
  }
  const filteredData = data.filter((item, i) => i === parseInt(index-1));
  return filteredData;
};



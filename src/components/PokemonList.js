import React, { useState, useEffect, useMemo } from "react";
import { fetchData } from "../utils/api";
import { sortData, filterDataByName, filterDataByIndex } from "../utils/helpers";
import Filter from "./Filter";
import SidebarComponent from "./SideBar";
import { List, Card } from "antd";
import { Link } from "react-router-dom";
const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("id");
  const [filterID, setPokemonID] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchData("/pokemon")
      .then((data) => {
        setPokemon(data.results);
      })
      .catch((error) => console.error(error));
  }, [type]);

  useEffect(() => {
    // Map over the Pokemon array and make a fetch request for each Pokemon
    const pokemonPromises = pokemon.map(pokemon => {
      return fetch(pokemon.url)
        .then(response => response.json());
    });
  
    // Wait for all fetch requests to complete and update the Pokemon list
    Promise.all(pokemonPromises)
      .then(pokemonList => {
        if (type !== "") {
          // Filter the Pokemon list based on the selected type
          const filteredPokemon = pokemonList.filter(p => p.types.some(t => t.type.name === type));
          setPokemon(filteredPokemon);
        } else {
          // If no type is selected, set the Pokemon list to all fetched Pokemon
          setPokemon(pokemonList);
        }
      });
  }, [type, pokemon]);


  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSortChange = (sort) => {
    setSort(sort);
  };

  const handleFilterIDChange = (filterID) => {
    setPokemonID(filterID);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const getImageUrl = (url) => {
    if (!url) {
      console.error('URL is undefined');
      return;
    }
  
    const imageUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
  
    return imageUrl + url.replace(pokemonUrl, "").replace("/", ".png");
  };
  

  const filteredPokemonName = useMemo(() => filterDataByName(pokemon, filter), [
    filter,
    pokemon,
  ]);
  const sortedPokemon = useMemo(() => sortData(filteredPokemonName, sort), [
    sort,
    filteredPokemonName,
  ]);
  const filteredPokemonID = useMemo(
    () => filterDataByIndex(sortedPokemon, filterID),
    [filterID, sortedPokemon]
  );

console.log(filteredPokemonID);
console.log(type);

  return (
    <div style={{ width: "1200px", margin: "0 auto", padding: "20px", display: "flex", background: "transparent"  }}>
        <SidebarComponent
          onFilterChange={handleFilterIDChange}
          onTypeChange={handleTypeChange}
        />
      <div style={{ width: '100%' }}>
        <Filter
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <List
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "20px",
          }}
          grid={{ gutter: 16, column: 4 }}
          dataSource={filteredPokemonID}
          renderItem={(poke) => (
            <List.Item>
              <Link to={`/pokemon/${poke.name}`}>
                <Card
                  hoverable
                  style={{ borderRadius: "10px", transition: "all 0.3s ease", 
                  background: "-webkit-linear-gradient(45deg, rgba(213, 15, 61, 0.6), rgba(13, 17, 198, 0.69) 100%)" }}
                  cover={<img alt={poke.name} src={poke.sprites?.front_default} />}
                  bodyStyle={{ display: "flex" }}
                >
                  <Card.Meta title={poke.name} style={{ color: '#fff'}} />
                </Card>
                
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default PokemonList;

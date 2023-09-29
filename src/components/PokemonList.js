import React, { useState, useEffect, useMemo } from "react";
import { fetchData } from "../utils/api";
import { sortData, filterDataByName, filterDataByIndex } from "../utils/helpers";
import Filter from "./Filter";
import SidebarComponent from "./SideBar";
import { List, Card } from "antd";
import { Link, useLocation } from "react-router-dom";
const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("id");
  const [filterID, setPokemonID] = useState("");
  const [type, setType] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchData("/pokemon")
      .then((data) => {
        const pokemonPromises = data.results.map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json());
        });

        Promise.all(pokemonPromises)
          .then(pokemonList => {
            if (type !== "") {
              const filteredPokemon = pokemonList.filter(p => p.types.some(t => t.type.name === type));
              setPokemon(filteredPokemon);
            } else {
              setPokemon(pokemonList);
            }
          });
      })
      .catch((error) => console.error(error));
  }, [type, location.pathname]);

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

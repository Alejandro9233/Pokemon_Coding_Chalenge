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
  const [filterRangeStart, setPokemonRangeStart] = useState("")
  const [filterRangeEnd, setPokemonRangeEnd] = useState("")
  

  useEffect(() => {
    fetchData("/pokemon")
      .then((data) => {
        setPokemon(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleSortChange = (sort) => {
    setSort(sort);
  };

  const handleFilterIDChange = (filterID) => {
    setPokemonID(filterID)
  };

  const handleFilterRangeStartChange = (filterRangeStart) => {
    setPokemonRangeEnd(filterRangeStart)
  };

  const handleFilterRangeEndtChange = (filterRangeEnd) => {
    setPokemonID(filterRangeEnd)
  };

  const getImageUrl = (url) => {
    const imageUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

    return imageUrl + url.replace(pokemonUrl, "").replace("/", ".png");
  };

  const filteredPokemonName = useMemo(() => filterDataByName(pokemon, filter), [filter,pokemon]);
  const sortedPokemon = useMemo(() => sortData(filteredPokemonName, sort), [sort, filteredPokemonName]);
  const filteredPokemonID = useMemo(() => filterDataByIndex(sortedPokemon, filterID), [filterID, sortedPokemon]);
  console.log(filteredPokemonID);
  return (
    <div style={{ width: "1200px", margin: "0 auto", padding: "20px", display: "flex", background: "transparent"  }}>
        <SidebarComponent
          onFilterChange={handleFilterIDChange}
          onSortChange={handleSortChange}
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
                  cover={<img alt={poke.name} src={getImageUrl(poke.url)} />}
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

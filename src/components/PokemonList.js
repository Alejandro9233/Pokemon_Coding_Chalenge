import React, { Component } from "react";
import { fetchData, getPokemonImg } from "../utils/api";
import { sortData, filterData } from "../utils/helpers";
import Filter from "./Filter";
import { List, Card } from "antd";
import { Link } from "react-router-dom";

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      filter: "",
      sort: "name",
    };
  }

  componentDidMount() {
    fetchData("/pokemon", 10)
      .then((data) => {
        this.setState({ pokemon: data.results });
      })
      .catch((error) => console.error(error));
  }

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleSortChange = (sort) => {
    this.setState({ sort });
  };

  getImageUrl = (url) => {
    const imageUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

    return imageUrl + url.replace(pokemonUrl, "").replace("/", ".png");
  };

  render() {
    const { pokemon, filter, sort } = this.state;
    const filteredPokemon = filterData(pokemon, filter);
    const sortedPokemon = sortData(filteredPokemon, sort);
    console.log(this.state);

    return (
      <div style={{ width: "100%", margin: "0 auto", padding: "20px" }}>
        <Filter
          onFilterChange={this.handleFilterChange}
          onSortChange={this.handleSortChange}
        />

        <List
          style={{
            background: "#f5f5f5",
            borderRadius: "10px",
            padding: "20px",
          }}
          grid={{ gutter: 16, column: 4 }}
          dataSource={filteredPokemon}
          renderItem={(poke) => (
            <List.Item>
              <Link to={`/pokemon/${poke.name}`}>
                <Card
                  hoverable
                  style={{ borderRadius: "10px", transition: "all 0.3s ease" }}
                  cover={
                    <img alt={poke.name} src={this.getImageUrl(poke.url)} />
                  }
                  bodyStyle={{ display: "flex", justifyContent: "center" }}
                >
                  <Card.Meta
                    title={poke.name.toUpperCase()}
                    style={{ textAlign: "center" }}
                  />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PokemonList;

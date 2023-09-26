import React, { Component } from "react";
import { fetchData } from "../utils/api";
import { Card } from "antd";
//import { componentDidMount } from "../components/PokemonList";

class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    fetchData(`/pokemon/${match.params.id}`)
      .then((data) => this.setState({ pokemon: data }))
      .catch((error) => console.error(error));
  }

  render() {
    const { pokemon } = this.state;
    console.log(pokemon);

    if (!pokemon) {
      return <div>Loading...</div>;
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{ width: 300 }}
          cover={
            <img alt={pokemon.name} src={pokemon.sprites?.front_default} />
          }
        >
          <Card.Meta
            title={pokemon.name}
            description={
              <>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>
                  Type: {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
              </>
            }
          />
        </Card>
      </div>
    );
  }
}

export default PokemonDetail;

import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import { Card } from "antd";

const PokemonDetail = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);

  useEffect(() => {
    fetchData(`/pokemon/${match.params.id}`)
      .then((data) => {
        setPokemon(data);
        // Use the data from the first fetch to make the second fetch
        return fetchData(`/characteristic/${data.id}`);
      })
      .then((data) => {
        const englishDescription = data.descriptions.find(desc => desc.language.name === "en")?.description || "";
        setPokemonDescription(englishDescription);
      })
      .catch((error) => console.error(error));
  }, [match.params.id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }
  console.log(pokemonDescription);

  return (
    <div style={{ fontSize: '40px' }}>
      <div style={{ display: 'flex' }}>
        <h1 style={{ color:'#fff', textAlign: 'center' }}> {pokemon.name.toUpperCase()} </h1>
        <h1 style={{ color:'#fff', marginLeft: '50%' }}> #{pokemon.id} </h1>
      </div>
      <div style={{ width: '1200px', display: "flex"}}>
        <div id="pokemonIMG" style={{ width: "49%", justifyContent: 'center', textAlign: 'center', fontSize: 'x-large' }}>
          <Card
            style={{ width: '80%', background: "-webkit-linear-gradient(45deg, rgba(213, 15, 61, 0.6), rgba(13, 17, 198, 0.69) 100%)",
            borderRadius: "10px", border: 'solid 10px #fff'}}
            cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
          >
          </Card>
        </div>
        
        <div id="pokemonStats" style={{ width: "49%", justifyContent: 'center', textAlign: 'center', fontSize: 'x-large' }}>
          <div id="pokemonDescription" style={{ background: '#00aaff', borderRadius: "10px", border: 'solid 10px #fff', width: '100%', marginBottom: '4%' }}>
          <h3 style={{ color: '#900069d9' }}>About</h3>
              <h4 style={{ color: '#fff', marginTop: '20px' }}>{pokemonDescription}</h4>
          </div>
          <div style={{ background: '#00aaff', display: 'flex', borderRadius: "10px", border: 'solid 10px #fff', display: "flex", width: '100%' }}> 
            <div style={{ width: '49%'}}>
              <h3 style={{ color: '#900069d9' }}>Height</h3>
              <h4 style={{ color: '#fff', marginTop: '20px' }}>{pokemon.height}0 cm</h4>
              <h3 style={{ color: '#900069d9' }}>Weight</h3>
              <h4 style={{ color: '#fff', marginTop: '20px' }}>{(pokemon.weight / 10).toFixed(2)} kg</h4>
            </div>
            <div style={{ width: '49%'}}>
              <h3 style={{ color: '#900069d9' }}>Type</h3>
              <h4 style={{ color: '#fff', marginTop: '20px' }}>{pokemon.types.map((type) => type.type.name).join(", ").toUpperCase()}</h4>
              <h3 style={{ color: '#900069d9' }}>Abilities</h3>
              <h4 style={{ color: '#fff', marginTop: '20px' }}>{pokemon.abilities.map((ability) => ability.ability.name).join(", ").toUpperCase()}</h4>
              
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};  
export default PokemonDetail;

import React from "react";
import PokemonCardDetails from "../../components/PokemonCardDetails";

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    
    return {
      props: {
        data: data,
        index: id,
        query: query,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
}

export default function index({ data, index, query }) {
    console.log(data);
    console.log('index ' + index);
    console.log('query', query);
    return (
      <>
        <PokemonCardDetails 
          img_src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
          pokemon_name={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
          pokemon_id={data.id}
          pokemon_ability={
              data.abilities.map((ability) => (
                  <div className="p-2">
                      {ability.ability.name}
                  </div>
              ))
          }
          pokemon_type={
            data.types.map((type) => (
                <div className="p-2">
                    {type.type.name}
                </div>
            ))
        }
        />
      </>
    );
  }
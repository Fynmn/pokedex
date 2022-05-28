import PokemonCard from "../../components/PokemonCard";
import Link from "next/link";

export async function getStaticProps(context) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const data = await response.json();

    return {
      props: {
        data: data.results,
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

function Pokemons({ data }) {
  return (
    <>
      {console.log(data)}
      <div className=" text-center p-10 text-4xl font-semibold">
        Pokedex
      </div>

      <div className=" w-full flex flex-wrap flex-col justify-center">
        <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:px-20 w-full place-items-center place-content-center">
          {data.slice(0, 18).map((pokemon, index) => (
            <Link key={index} href={`/pokemon?id=${index + 1}`}>
              <a>
                <PokemonCard
                  pokemon_name={
                    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                  }
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pokemons;

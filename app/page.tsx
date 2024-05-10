import Image from "next/image";

type Pokemon = {
  id: number;
  name: string;
  image: string;
};

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await res.json();
  console.log('data::: ', data);
  return data.results;
};

export default function Home() {
  const pokemons: Promise<Pokemon[]> = fetchPokemons();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid grid-cols-2 gap-4'>
        {pokemons.then((pokemonList) =>
          pokemonList.map((pokemon: Pokemon) => (
            <div key={pokemon.id} className='bg-gray-200 p-4'>
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={200}
                height={200}
              />
              <p>{pokemon.name}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

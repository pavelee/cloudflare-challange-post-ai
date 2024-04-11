import Image from "next/image";
import { askAI } from "./action/askAI";
import { Suspense } from "react";

type PokemonProps = {
  pokemon: string;
}

export const Pokemon = (props: PokemonProps) => {
  const { pokemon } = props;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src={`/api/image?prompt="pokemon: ${pokemon}"`}
        width={500}
        height={500}
        alt={`Pokemon: ${pokemon}`}
      />
      <Suspense>
        <PokemonDesc pokemon={pokemon} />
      </Suspense>
    </main>
  );
}

export const PokemonDesc = async (props: PokemonProps) => {
  const { pokemon } = props;
  const res = await askAI(`Describe pokemon: ${pokemon}`);
  return <p>{res}</p>
}

type HomeProps = {
  searchParams: {
    pokemon: string;
  }
}

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const pokemon = searchParams.pokemon ?? "pikachu";
  // const res = await askAI("Hello!");
  // console.log(res);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense>
        <Pokemon pokemon={pokemon} />
      </Suspense>
    </main>
  );
}

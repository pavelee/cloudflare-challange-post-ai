import Image from "next/image";
import { askAI } from "./action/askAI";
import { Suspense } from "react";
import { Form } from "./component/Form";

export const runtime = 'edge';

type PokemonProps = {
  pokemon: string;
}

const Pokemon = (props: PokemonProps) => {
  const { pokemon } = props;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Image
        src={`/api/image?prompt="pokemon: ${pokemon}"`}
        width={500}
        height={500}
        alt={`Pokemon: ${pokemon}`}
      /> */}
      <Suspense>
        <PokemonDesc pokemon={pokemon} />
      </Suspense>
    </main>
  );
}

const PokemonDesc = async (props: PokemonProps) => {
  const { pokemon } = props;
  const res = await askAI(`Create HTML for table of stats`, '@hf/thebloke/deepseek-coder-6.7b-base-awq');
  return <p>{res}</p>
}

const AIComponent = async (props: PokemonProps) => {
  const { pokemon } = props;
  let prompt = `You are programmer assistant. Here is HTML code to edit: <table style="border-collapse: collapse; width: 100%;"> <tr style="border: 1px solid black;"> <td style="padding: 10px; text-align: center;">Cell 1</td> <td style="padding: 10px; text-align: center;">Cell 2</td> </tr> <tr style="border: 1px solid black;"> <td style="padding: 10px; text-align: center;">Cell 3</td> <td style="padding: 10px; text-align: center;">Cell 4</td> </tr> </table>`;
  // prompt = ` ${pokemon}. Add inline css styles. Return only changed HTML code.`
  prompt += ` ${pokemon}. Add only inline css. Return only changed HTML code, do not add any comments or explanations.`
  const res = await askAI(prompt, '@hf/thebloke/openhermes-2.5-mistral-7b-awq');
  console.log(res);
  return <div className="flex flex-col gap-4">
    <div
      dangerouslySetInnerHTML={{ __html: res }}
    >
    </div>
    <div>
      {res}
    </div>
  </div>
}

type HomeProps = {
  searchParams: {
    pokemon: string;
  }
}

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const pokemon = searchParams.pokemon ?? "Create a table of stats for a Pokemon.";
  // const res = await askAI("Hello!");
  // console.log(res);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <Form />
      <Suspense fallback={<div>Loading...</div>}>
        {/* <AIComponent pokemon={pokemon} /> */}
      </Suspense>
    </main>
  );
}

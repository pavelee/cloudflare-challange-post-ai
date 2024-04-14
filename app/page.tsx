import { Form } from "./component/Form";

export const runtime = 'edge';

type HomeProps = {
  searchParams: {
  }
}

export default async function Home(props: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <Form />
    </main>
  );
}

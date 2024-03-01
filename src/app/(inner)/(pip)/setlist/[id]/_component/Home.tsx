interface HomeProps {
  params: {
    id: string;
  };
}

export default async function Home({ params }: HomeProps) {
  return (
    <main id="app">
      <div>
        <h1>Setlist</h1>
        <p>Setlist page</p>
        <p>id: {params.id}</p>
      </div>
    </main>
  );
}

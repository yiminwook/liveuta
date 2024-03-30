import Home from '@inner/_component/Home';

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams.q?.trim();
  return <Home filter="live" query={query} />;
}

import Home from './_component/Home';

interface Props {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  return <Home searchParams={searchParams} />;
}

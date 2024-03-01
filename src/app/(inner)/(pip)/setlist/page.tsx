import Home from './_component/Home';

interface Props {
  searchParams: {
    query?: string;
    page?: number;
  };
}

export default async function Page({ searchParams }: Props) {
  return <Home searchParams={searchParams} />;
}

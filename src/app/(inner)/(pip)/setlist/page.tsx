import { Metadata } from 'next';
import Home from './_component/Home';

export const metadata: Metadata = {
  title: '세트리 | Live Uta',
};

interface Props {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  return <Home searchParams={searchParams} />;
}

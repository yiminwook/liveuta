import { notFound } from 'next/navigation';
import Home from '@/components/channel/Home';

type Props = {
  searchParams: {
    page?: string;
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const page = Number(searchParams.page || 1);
  const query = searchParams.q?.trim();
  if (Number.isNaN(page)) notFound();
  return <Home currentPage={page} query={query} />;
}

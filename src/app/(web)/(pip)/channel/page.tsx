import Home from '@/components/channel/Home';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page || 1);
  const query = searchParams.q?.trim();
  if (Number.isNaN(page)) notFound();
  return <Home currentPage={page} query={query} />;
}

import { Metadata } from 'next';
import Home from '@/components/setlist/Home';

export const metadata: Metadata = {
  title: '세트리 | Live Uta',
};

type Props = {
  searchParams: Promise<{
    query?: string;
    page?: string;
    order?: 'broadcast' | 'create';
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  return <Home searchParams={searchParams} />;
}

import { Metadata } from 'next';
import Home from '@/components/setlist/Home';

export const metadata: Metadata = {
  title: '세트리 | Live Uta',
};

type Props = {
  searchParams: {
    query?: string;
    page?: string;
    order?: 'broadcast' | 'create';
  };
};

export default async function Page({ searchParams }: Props) {
  return <Home searchParams={searchParams} />;
}

import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import Home from '@inner/_component/Home';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: { tab?: 'daily' | 'all'; q?: string };
};

export default async function Page({ searchParams }: Props) {
  const filter: keyof ScheduleAPIReturntype = searchParams.tab || 'scheduled';
  const query = searchParams.q?.trim();
  if (!['scheduled', 'live', 'daily', 'all'].includes(filter)) notFound();

  return <Home filter={filter} query={query} />;
}

import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import Home from '@inner/_component/Home';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: { tab?: 'daily' | 'all' | 'live'; q?: string };
};

const TAB_LIST = ['scheduled', 'live', 'daily', 'all'];

export default async function Page({ searchParams }: Props) {
  const filter: keyof ScheduleAPIReturntype = searchParams.tab || 'scheduled';
  const query = searchParams.q?.trim() || '';
  if (!TAB_LIST.includes(filter)) notFound();

  return <Home filter={filter} query={query} />;
}

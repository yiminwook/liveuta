import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import Home from '@inner/_component/Home';

type Props = {
  searchParams: { tab?: 'daily' | 'all' };
};

export default async function Page({ searchParams }: Props) {
  let filter: keyof ScheduleAPIReturntype = searchParams.tab || 'scheduled';

  if (['scheduled', 'live', 'daily', 'all'].includes(filter) === false) {
    filter = 'scheduled';
  }

  return <Home filter={filter} />;
}

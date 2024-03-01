import { getCookies } from '@inner/_lib/getCookie';
import NavSection from './header/NavSection';
import ScheduleSection from './ScheduleSection';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import dynamic from 'next/dynamic';
import ScheduleDataProvider from './ScheduleQueryProvider';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getSchedule from '@inner/_lib/getSchedule';
import { getQueryClient } from '@inner/_lib/getQueryClient';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

interface HomeProps {
  filter: keyof ScheduleAPIReturntype;
}

export default async function Home({ filter }: HomeProps) {
  const { select } = await getCookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main id="app">
      <HydrationBoundary state={dehydratedState}>
        <ScheduleDataProvider filter={filter} select={select}>
          <NavSection />
          <TopSection filter={filter} />
          <ScheduleSection />
        </ScheduleDataProvider>
      </HydrationBoundary>
    </main>
  );
}

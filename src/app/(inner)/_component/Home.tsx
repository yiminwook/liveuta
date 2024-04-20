import getQueryClient from '@/app/_lib/getQueryClient';
import { auth } from '@/model/nextAuth';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { GetScheduleRes } from '@api/schedule/type';
import { getCookies } from '@inner/_lib/getCookie';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Background from './Background';
import HomeDataObserver from './Home.data';
import NavSection from './navSection/NavSection';
import ScheduleSection from './ScheduleSection';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

type HomeProps = {
  filter: keyof ScheduleAPIReturntype;
  query: string;
};

export default async function Home({ filter, query }: HomeProps) {
  const { select } = await getCookies();
  const session = await auth();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['schedule'],
    queryFn: () =>
      axios
        .get<GetScheduleRes>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/schedule`)
        .then((res) => res.data.data),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Background tile={true}>
        <HomeDataObserver filter={filter} select={select} query={query} />
        <NavSection />
        <TopSection filter={filter} />
        <ScheduleSection session={session} />
      </Background>
    </HydrationBoundary>
  );
}

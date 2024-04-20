import { auth } from '@/model/nextAuth';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { getCookies } from '@inner/_lib/getCookie';
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

  return (
    <Background tile={true}>
      <HomeDataObserver filter={filter} select={select} query={query} />
      <NavSection />
      <TopSection filter={filter} />
      <ScheduleSection session={session} />
    </Background>
  );
}

import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { getCookies } from '@inner/_lib/getCookie';
import dynamic from 'next/dynamic';
import HomeDataObserver from './Home.data';
import ScheduleSection from './ScheduleSection';
import NavSection from './navSection/NavSection';
import { auth } from '@/model/nextAuth';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

type HomeProps = {
  filter: keyof ScheduleAPIReturntype;
};

export default async function Home({ filter }: HomeProps) {
  const { select } = await getCookies();
  const session = await auth();

  return (
    <>
      <HomeDataObserver session={session} filter={filter} select={select} />
      <NavSection />
      <TopSection filter={filter} />
      <ScheduleSection session={session} />
    </>
  );
}

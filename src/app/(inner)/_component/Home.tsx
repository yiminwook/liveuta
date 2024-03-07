import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { getCookies } from '@inner/_lib/getCookie';
import dynamic from 'next/dynamic';
import DataObserver from './DataObserver';
import ScheduleSection from './ScheduleSection';
import NavSection from './header/NavSection';

const TopSection = dynamic(() => import('./TopSection'), { ssr: false });

type HomeProps = {
  filter: keyof ScheduleAPIReturntype;
};

export default async function Home({ filter }: HomeProps) {
  const { select } = await getCookies();

  return (
    <DataObserver filter={filter} select={select}>
      <NavSection />
      <TopSection filter={filter} />
      <ScheduleSection />
    </DataObserver>
  );
}

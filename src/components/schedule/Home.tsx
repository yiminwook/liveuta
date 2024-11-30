import { auth } from '@/libraries/nextAuth';
import { ScheduleAPIReturnType } from '@/types/api/mongoDB';
import { getCookies } from '@/utils/getCookie';
import Background from '../common/Background';
import HomeDataObserver from './Home.data';
import ScheduleSection from './ScheduleSection';

type HomeProps = {
  filter: keyof ScheduleAPIReturnType;
  query: string;
};

export default async function Home({ filter, query }: HomeProps) {
  const { select } = await getCookies();
  const session = await auth();

  return (
    <Background tile={true}>
      <HomeDataObserver filter={filter} select={select} query={query} />
      <ScheduleSection session={session} />
    </Background>
  );
}

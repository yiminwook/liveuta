import getChannelData from '@/utils/getChannelData';
import ChannelSection from './ChannelSection';
import PaginationBox from './PaginationBox';
import Nav from './Nav';
import { auth } from '@/libraries/nextAuth';
import Background from '@/components/common/Background';
import css from './Home.module.scss';

type HomeProps = {
  currentPage: number;
  query: string | undefined;
};

export default async function Home({ currentPage, query }: HomeProps) {
  const session = await auth();
  const { totalLength, contents } = await getChannelData(currentPage, { query });

  return (
    <Background>
      <div className={css.inner}>
        <Nav />
        <ChannelSection contents={contents} session={session} />
        <PaginationBox totalLength={totalLength} currentPage={currentPage} query={query} />
      </div>
    </Background>
  );
}

import Background from '@/components/common/background/Background';
import { auth } from '@/libraries/nextAuth';
import getChannelData from '@/utils/getChannelData';
import ChannelSection from './ChannelSection';
import css from './Home.module.scss';
import Nav from './Nav';
import PaginationBox from './PaginationBox';

type HomeProps = {
  currentPage: number;
  query: string | undefined;
};

export default async function Home({ currentPage, query }: HomeProps) {
  const session = await auth();
  const { totalPage, contents } = await getChannelData(currentPage, { query });

  return (
    <Background>
      <div className={css.inner}>
        <Nav />
        <ChannelSection contents={contents} session={session} />
        <PaginationBox totalPage={totalPage} currentPage={currentPage} query={query} />
      </div>
    </Background>
  );
}

import getChannelData from '../_lib/getChannelData';
import ChannelSection from './ChannelSection';
import PaginationBox from './PaginationBox';
import * as styles from './home.css';
import Nav from './Nav';
import { auth } from '@/model/nextAuth';
import Background from '@inner/_component/Background';

type HomeProps = {
  currentPage: number;
  query: string | undefined;
};

export default async function Home({ currentPage, query }: HomeProps) {
  const session = await auth();
  const { totalLength, contents } = await getChannelData(currentPage, { query });

  return (
    <Background>
      <div className={styles.inner}>
        <Nav />
        <ChannelSection contents={contents} session={session} />
        <PaginationBox totalLength={totalLength} currentPage={currentPage} query={query} />
      </div>
    </Background>
  );
}

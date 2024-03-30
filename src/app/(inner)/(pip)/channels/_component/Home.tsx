import getChannelData from '../_lib/getChannelData';
import ChannelSection from './ChannelSection';
import PaginationBox from './PaginationBox';
import * as styles from './home.css';
import Nav from './Nav';

type HomeProps = {
  currentPage: number;
  query: string | undefined;
};

export default async function Home({ currentPage, query }: HomeProps) {
  const { totalLength, contents } = await getChannelData(currentPage, { query });

  return (
    <div className={styles.inner}>
      <Nav />
      <ChannelSection contents={contents} />
      <PaginationBox totalLength={totalLength} currentPage={currentPage} query={query} />
    </div>
  );
}

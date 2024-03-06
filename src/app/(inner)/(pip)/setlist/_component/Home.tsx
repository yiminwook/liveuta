import { generateChannelObject, getAllChannel } from '@/model/mongoDB/getAllChannel';
import Link from 'next/link';
import List from './List';
import SearchForm from './SearchForm';
import * as styles from './home.css';

interface HomeProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const channelData = await getAllChannel();
  const channelDataset = generateChannelObject(channelData.channels);

  const parseSearchParams = {
    query: searchParams.query || '',
    page: Number(searchParams.page) || 1,
  };

  return (
    <>
      <div className={styles.inner}>
        <section className={styles.top}>
          <h1 className={styles.title}>세트리</h1>
        </section>
        <section className={styles.bottom}>
          <div className={styles.inputArea}>
            <div>
              <SearchForm searchParams={parseSearchParams} />
            </div>
            <div className={styles.postLinkBox}>
              <Link href="/setlist">초기화</Link>
            </div>
            <div className={styles.postLinkBox}>
              <Link href="/setlist/post">작성하러 가기</Link>
            </div>
          </div>
          <div>
            <List searchParams={parseSearchParams} channelDataset={channelDataset} />
          </div>
        </section>
      </div>
    </>
  );
}

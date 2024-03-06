import Link from 'next/link';
import SearchForm from './SearchForm';
import List from './List';
import * as styles from './home.css';
import { generateChannelObject, getAllChannel } from '@/model/mongoDB/getAllChannel';

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

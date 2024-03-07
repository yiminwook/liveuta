import { generateChannelObject, getAllChannel } from '@/model/mongoDB/getAllChannel';
import List from './List';
import * as styles from './home.css';
import Nav from './Nav';

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
        <h1 className="blind">세트리</h1>
        <Nav searchParams={parseSearchParams} />
        <List searchParams={parseSearchParams} channelDataset={channelDataset} />
      </div>
    </>
  );
}

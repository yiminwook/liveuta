import { generateChannelObject, getAllChannel } from '@/model/mongoDB/getAllChannel';
import Table from './Table';
import * as styles from './home.css';
import Nav from './Nav';
import { auth } from '@/model/nextAuth';

interface HomeProps {
  searchParams: {
    query?: string;
    page?: string;
    order?: 'broadcast' | 'create';
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await auth();
  const channelData = await getAllChannel();
  const channelDataset = generateChannelObject(channelData);

  const parseSearchParams = {
    query: searchParams.query || '',
    page: Number(searchParams.page) || 1,
    order: searchParams.order || 'create',
  };

  return (
    <>
      <div className={styles.inner}>
        <h1 className="blind">세트리</h1>
        <Nav searchParams={parseSearchParams} />
        <Table session={session} searchParams={parseSearchParams} channelDataset={channelDataset} />
      </div>
    </>
  );
}

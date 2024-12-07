import Background from '@/components/common/Background';
import { generateChannelObject, getAllChannel } from '@/libraries/mongoDB/getAllChannel';
import { auth } from '@/libraries/nextAuth';
import css from './Home.module.scss';
import Nav from './Nav';
import Table from './Table';

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
    <Background>
      <div className={css.inner}>
        <h1 className="blind">세트리</h1>
        <Nav searchParams={parseSearchParams} session={session} />
        <Table session={session} searchParams={parseSearchParams} channelDataset={channelDataset} />
      </div>
    </Background>
  );
}

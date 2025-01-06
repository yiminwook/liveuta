import Background from '@/components/common/background/Background';
import { auth } from '@/libraries/nextAuth';
import { getTranslations } from 'next-intl/server';
import css from './Home.module.scss';
import Nav from './Nav';
import Table from './Table';

interface HomeProps {
  searchParams: {
    query?: string;
    page?: string;
    sort?: 'broadcast' | 'create';
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await auth();
  const t = await getTranslations('setlist');

  const parseSearchParams = {
    query: searchParams.query || '',
    page: Number(searchParams.page) || 1,
    sort: searchParams.sort || 'create',
  };

  return (
    <Background>
      <div className={css.inner}>
        <h1 className="blind">{t('title')}</h1>
        <Nav searchParams={parseSearchParams} session={session} />
        <Table session={session} searchParams={parseSearchParams} />
      </div>
    </Background>
  );
}

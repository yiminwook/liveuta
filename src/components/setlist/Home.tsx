'use client';
import Background from '@/components/common/background/Background';
import { useTranslations } from '@/libraries/i18n/client';
import { useSession } from 'next-auth/react';
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

export default function Home({ searchParams }: HomeProps) {
  const { data: session } = useSession();
  const { t } = useTranslations();

  const parseSearchParams = {
    query: searchParams.query || '',
    page: Number(searchParams.page) || 1,
    sort: searchParams.sort || 'create',
  };

  return (
    <Background>
      <div className={css.inner}>
        <h1 className="blind">{t('setlist.title')}</h1>
        <Nav searchParams={parseSearchParams} session={session} />
        <Table session={session} searchParams={parseSearchParams} />
      </div>
    </Background>
  );
}

'use client';
import { Button, SegmentedControl } from '@mantine/core';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import css from './Nav.module.scss';
import PostDrawer from './PostDrawer';
import SearchForm from './SearchForm';

type OrderType = 'broadcast' | 'create';

type SearchFormProps = {
  searchParams: {
    query: string;
    page: number;
    sort: 'broadcast' | 'create';
  };
  session: Session | null;
};

export default function Nav({ searchParams, session }: SearchFormProps) {
  const router = useRouter();
  const t = useTranslations('setlist.nav');

  function handleOrderChange(value: OrderType) {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', searchParams.page.toString());
    query.set('sort', value);
    router.push(`/setlist?${query.toString()}`);
  }

  return (
    <div className={css.wrap}>
      <div className={css.left}>
        <SegmentedControl
          value={searchParams.sort}
          onChange={(value) => handleOrderChange(value as OrderType)}
          data={[
            { label: t('sortBroadcast'), value: 'broadcast' },
            { label: t('sortCreate'), value: 'create' },
          ]}
        />
        <div className={css.setlist}>
          <PostDrawer session={session} />
          <Button
            className={css.createLink}
            variant="gradient"
            component={Link}
            href="/setlist/create"
          >
            {t('createNew')}
          </Button>
        </div>
      </div>
      <SearchForm searchParams={searchParams} />
    </div>
  );
}

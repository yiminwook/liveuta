'use client';
import { SegmentedControl } from '@mantine/core';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
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
            { label: '방송일', value: 'broadcast' },
            { label: '작성일', value: 'create' },
          ]}
        />
        <PostDrawer session={session} />
      </div>
      <SearchForm searchParams={searchParams} />
    </div>
  );
}

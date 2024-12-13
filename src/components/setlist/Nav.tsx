'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import { useTransitionRouter } from 'next-view-transitions';
import { FaFilter } from 'react-icons/fa';
import css from './Nav.module.scss';
import PostDrawer from './PostDrawer';
import SearchForm from './SearchForm';

type SearchFormProps = {
  searchParams: {
    query: string;
    page: number;
    order: 'broadcast' | 'create';
  };
  session: Session | null;
};
export default function Nav({ searchParams, session }: SearchFormProps) {
  const router = useRouter(useTransitionRouter);
  const queryClient = useQueryClient();

  const handleReset = () => {
    if (searchParams.query === '' && searchParams.page === 1) {
      queryClient.invalidateQueries({ queryKey: ['searchSetlist', searchParams] });
    } else {
      router.push('/setlist');
    }
  };

  const toggleOrder = () => {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', searchParams.page.toString());
    query.set('order', searchParams.order === 'broadcast' ? 'create' : 'broadcast');
    router.push(`/setlist?${query.toString()}`);
  };

  return (
    <div className={css.wrap}>
      <SearchForm searchParams={searchParams} />
      <div className={css.buttons}>
        <button className={css.navButton} type="button" onClick={handleReset}>
          초기화
        </button>
        <button onClick={toggleOrder} className={css.navButton} style={{ cursor: 'pointer' }}>
          <FaFilter size={14} />
          {searchParams.order === 'create' ? '작성일' : '방송일'}
        </button>
        <PostDrawer session={session} />
      </div>
    </div>
  );
}

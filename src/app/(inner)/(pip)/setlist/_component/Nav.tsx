'use client';
import SearchForm from './SearchForm';
import { useRouter } from 'next/navigation';
import * as styles from './nav.css';
import { useQueryClient } from '@tanstack/react-query';
import { BREAK_POINT } from '@/style/var';
import { useMediaQuery } from 'react-responsive';
import { FaFilter } from 'react-icons/fa';

type SearchFormProps = {
  searchParams: {
    query: string;
    page: number;
    order: 'broadcast' | 'create';
  };
};
export default function Nav({ searchParams }: SearchFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery({ query: `(max-width: ${BREAK_POINT.md}px)` });

  const handleReset = () => {
    if (searchParams.query === '' && searchParams.page === 1) {
      queryClient.invalidateQueries({ queryKey: ['searchSetlist', searchParams] });
    } else {
      router.push('/setlist');
    }
  };

  const navigatePost = () => {
    router.push('/setlist/post');
  };

  const toggleOrder = () => {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', searchParams.page.toString());
    query.set('order', searchParams.order === 'broadcast' ? 'create' : 'broadcast');
    router.push(`/setlist?${query.toString()}`);
  };

  if (isMobile) {
    return (
      <div className={styles.mobileWrap}>
        <div>
          <SearchForm searchParams={searchParams} />
        </div>
        <div className={styles.mobileNavBox}>
          <button className={styles.navButton} type="button" onClick={handleReset}>
            초기화
          </button>
          <button onClick={toggleOrder} className={styles.navButton} style={{ cursor: 'pointer' }}>
            <FaFilter size={14} />
            {searchParams.order === 'create' ? '작성일' : '방송일'}
          </button>
          <button className={styles.navButton} type="button" onClick={navigatePost}>
            작성
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <SearchForm searchParams={searchParams} />
      <button className={styles.navButton} type="button" onClick={handleReset}>
        초기화
      </button>
      <button onClick={toggleOrder} className={styles.navButton} style={{ cursor: 'pointer' }}>
        <FaFilter size={14} />
        {searchParams.order === 'create' ? '작성일' : '방송일'}
      </button>
      <button className={styles.navButton} type="button" onClick={navigatePost}>
        작성
      </button>
    </div>
  );
}

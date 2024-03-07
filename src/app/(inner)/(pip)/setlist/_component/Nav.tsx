'use client';
import SearchForm from './SearchForm';
import { useRouter } from 'next/navigation';
import * as styles from './nav.css';
import { useQueryClient } from '@tanstack/react-query';

type SearchFormProps = {
  searchParams: {
    query: string;
    page: number;
  };
};
export default function Nav({ searchParams }: SearchFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

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

  return (
    <div className={styles.wrap}>
      <SearchForm searchParams={searchParams} />
      <button className={styles.navButton} type="button" onClick={handleReset}>
        초기화
      </button>
      <button className={styles.navButton} type="button" onClick={navigatePost}>
        작성
      </button>
    </div>
  );
}

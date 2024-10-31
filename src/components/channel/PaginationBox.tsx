'use client';
import Pagination from '@/components/common/Pagination';
import { ITEMS_PER_PAGE } from '@/constants';
import { useRouter } from 'next/navigation';
import * as styles from './home.css';

type PaginationBoxProps = {
  currentPage: number;
  totalLength: number;
  query: string | undefined;
};

export default function PaginationBox({ currentPage, totalLength, query }: PaginationBoxProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    searchParams.set('page', page.toString());
    router.push(`/channel?${searchParams.toString()}`);
  };

  return (
    <div className={styles.paginationBox}>
      <Pagination
        count={totalLength}
        pageSize={ITEMS_PER_PAGE}
        sliblingCount={2}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

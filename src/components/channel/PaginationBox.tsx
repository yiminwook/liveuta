'use client';
import { useLocale } from '@/libraries/i18n/client';
import { useRouter } from '@bprogress/next';
import { Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useSearchParams } from 'next/navigation';
import css from './Home.module.scss';

type PaginationBoxProps = {
  currentPage: number;
  totalPage: number;
  query: string;
};

export default function PaginationBox({ currentPage, totalPage, query }: PaginationBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('page', page.toString());
    router.push(`/${locale}/channel?${params.toString()}`);
  };

  return (
    <div className={css.paginationBox}>
      <Pagination
        total={totalPage}
        size={isDesktop ? 'md' : 'sm'}
        value={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

'use client';
import { useRouter as i18nRouter } from '@/i18n/routing';
import { Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import css from './Home.module.scss';

type PaginationBoxProps = {
  currentPage: number;
  totalPage: number;
  query: string;
};

export default function PaginationBox({ currentPage, totalPage, query }: PaginationBoxProps) {
  const router = useRouter(i18nRouter);
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('page', page.toString());
    router.push(`/channel?${params.toString()}`);
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

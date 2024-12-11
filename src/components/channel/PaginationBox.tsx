'use client';
import { Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useTransitionRouter } from 'next-view-transitions';
import css from './Home.module.scss';

type PaginationBoxProps = {
  currentPage: number;
  totalPage: number;
  query: string | undefined;
};

export default function PaginationBox({ currentPage, totalPage, query }: PaginationBoxProps) {
  const router = useTransitionRouter();
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointSm})`);

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    searchParams.set('page', page.toString());
    router.push(`/channel?${searchParams.toString()}`);
  };

  return (
    <div className={css.paginationBox}>
      <Pagination
        total={totalPage}
        siblings={2}
        size={isDesktop ? 'md' : 'sm'}
        value={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

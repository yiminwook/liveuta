import { useMemo } from 'react';
import pagination from '@/styles/common/Pagination.module.scss';
import {
  AfterLink,
  BeforeLink,
  FirstLink,
  LastLink,
  PaginationChild,
} from '@/components/common/pagination/PaginationChild';
import { ITEMS_PER_PAGE, PAGINATION_RANGE } from '@/consts';
import { useRouter } from 'next/router';

interface PaginationProps {
  totalLength: number;
}

const Pagination = ({ totalLength }: PaginationProps) => {
  const {
    query: { page },
  } = useRouter();

  const currentPage = useMemo(() => {
    return Number(page?.toString()) || 1;
  }, [page]);

  const totalPage = useMemo(() => {
    return Math.ceil(totalLength / ITEMS_PER_PAGE);
  }, [totalLength]);

  let init = (Math.ceil(currentPage / PAGINATION_RANGE) - 1) * PAGINATION_RANGE + 1;
  if (init <= 0) init = 1;

  const pageArray = Array.from(Array(PAGINATION_RANGE), (x, i) => {
    const page = i + init;
    return page > totalPage ? null : page;
  });

  return (
    <ul className={pagination['pagination']}>
      <FirstLink currentPage={currentPage} />
      <BeforeLink initialPage={pageArray[0]} totalLength={totalPage} />
      {pageArray.map((page, index) => (
        <PaginationChild key={`pagination-list-${index}`} page={page} currentPage={currentPage} />
      ))}
      <AfterLink initialPage={pageArray[0]} totalPage={totalPage} />
      <LastLink currentPage={currentPage} totalPage={totalPage} />
    </ul>
  );
};

export default Pagination;

import { PAGINATION_RANGE } from '@/consts';
import pagination from '@/styles/common/Pagination.module.scss';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import Link from 'next/link';
import { useLocation } from '@/hooks/useLocation';

export const FirstLink = ({ currentPage }: { currentPage: number }) => {
  const location = useLocation();
  return (
    <li>
      <Link href={`${location}/page/1`} className={currentPage === 1 ? pagination['disabled'] : ''}>
        <MdKeyboardDoubleArrowLeft size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

export const BeforeLink = ({ initialPage }: { initialPage: number | null; totalLength: number }) => {
  const location = useLocation();

  if (initialPage === null) return null;

  return (
    <li>
      <Link
        href={`${location}/page/${initialPage - PAGINATION_RANGE}`}
        className={initialPage === 1 ? pagination['disabled'] : ''}
      >
        <MdKeyboardArrowLeft size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

export const AfterLink = ({ initialPage, totalPage }: { initialPage: number | null; totalPage: number }) => {
  const location = useLocation();
  if (initialPage === null) return null;

  return (
    <li>
      <Link
        href={`${location}page/${initialPage + PAGINATION_RANGE}`}
        className={totalPage < initialPage + 1 + PAGINATION_RANGE ? pagination['disabled'] : ''}
      >
        <MdKeyboardArrowRight size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

export const LastLink = ({ currentPage, totalPage }: { currentPage: number; totalPage: number }) => {
  const location = useLocation();

  return (
    <li>
      <Link href={`${location}/page/${totalPage}`} className={currentPage === totalPage ? pagination['disabled'] : ''}>
        <MdKeyboardDoubleArrowRight size="1rem" color="inherit" />
      </Link>
    </li>
  );
};

interface PaginationChildProps {
  currentPage: number;
  page: number | null;
}

export const PaginationChild = ({ page, currentPage }: PaginationChildProps) => {
  const location = useLocation();

  if (page === undefined || page === null) {
    return null;
  }

  return (
    <li>
      <Link href={`${location}/page/${page}`} className={page === currentPage ? pagination['active'] : ''}>
        {page}
      </Link>
    </li>
  );
};

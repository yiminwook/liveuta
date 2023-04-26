import { ITEMS_PER_PAGE, PAGENATION_RANGE } from '@/consts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface PaginationProps {
  totalLength: number;
}

const Pagination = ({ totalLength }: PaginationProps) => {
  const { query } = useRouter();
  const currentPage = Number(query.page) || 1; //NaN일때 1로 변환
  const totalPage = Math.ceil(totalLength / ITEMS_PER_PAGE);
  const pages = Array.from({ length: PAGENATION_RANGE }, (_, i) => currentPage - PAGENATION_RANGE + i + 3).filter(
    (page) => page > 0 && totalPage >= page,
  );

  console.log(pages);

  return (
    <div>
      <ul>
        <li>
          <PaginationItem to={currentPage - 1} value="&lt;" disabled={currentPage === 1} />
        </li>
        {pages.map((page) => (
          <PaginationItem key={page} to={page} value={page} active={page === currentPage} />
        ))}
        <li>
          <PaginationItem to={currentPage + 1} value="&gt;" disabled={currentPage === totalPage} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

interface PaginationItemProps {
  to: number;
  value: ReactNode;
  disabled?: boolean;
  active?: boolean;
}

const PaginationItem = ({ to, value, disabled = false, active = false }: PaginationItemProps) => {
  const { pathname, query } = useRouter();
  const paginationRoute = '/page/[page]';
  const extendedPathname =
    pathname.indexOf(paginationRoute) === -1 ? `${pathname.replace(/\/$/, '')}${paginationRoute}` : pathname;

  return (
    <Link href={{ pathname: extendedPathname, query: { ...query, page: to } }}>
      <button disabled={disabled}>{value}</button>
    </Link>
  );
};

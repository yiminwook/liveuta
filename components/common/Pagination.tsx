import { ITEMS_PER_PAGE, PAGENATION_RANGE } from '@/consts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import pagnination from '@/styles/common/Pagination.module.scss';

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

  return (
    <div className={pagnination['pagnination']}>
      <ul>
        <PaginationItem to={currentPage - 1} value="&lt;" disabled={currentPage === 1} />
        {pages.map((page) => (
          <PaginationItem key={page} to={page} value={page} active={page === currentPage} />
        ))}
        <PaginationItem to={currentPage + 1} value="&gt;" disabled={currentPage === totalPage} />
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

  const renderClassName = () => {
    if (active === true) {
      return [pagnination['button'], pagnination['active']].join(' ');
    } else if (disabled === true) {
      return [pagnination['button'], pagnination['disabled']].join(' ');
    } else {
      return pagnination['button'];
    }
  };

  return (
    <li>
      <Link href={{ pathname: extendedPathname, query: { ...query, page: to } }}>
        <button className={renderClassName()} disabled={disabled} tabIndex={-1}>
          {value}
        </button>
      </Link>
    </li>
  );
};

import { Pagination as ArkPagination } from '@ark-ui/react';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import * as styles from './pagination.css';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  /** 최대 아이템 수 */
  count: number;
  /** 페이지당 아이템 수 */
  pageSize: number;
  /**
   * Pagination 버튼 수
   *
   * 3이면 현재페이지를 기준으로 앞뒤로 3개씩 보여준다.
   */
  sliblingCount: number;
};

export default function Pagination({
  count,
  pageSize,
  sliblingCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();

  if (currentPage > Math.ceil(count / pageSize)) {
    return (
      <div>
        <p>조회된 페이지가 없습니다.</p>
        <button className={styles.backButton} onClick={() => router.back()}>
          뒤로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <ArkPagination.Root
      className={styles.wrap}
      count={count}
      pageSize={pageSize}
      siblingCount={sliblingCount}
      page={currentPage}
      onPageChange={(details) => onPageChange(details.page)}
    >
      {({ pages }) => (
        <>
          <ArkPagination.PrevTrigger className={styles.item}>
            <MdKeyboardArrowLeft size="1.5rem" color="inherit" />
          </ArkPagination.PrevTrigger>
          {pages.map((page, index) =>
            page.type === 'page' ? (
              <ArkPagination.Item
                className={cx(styles.item, page.value === currentPage && styles.active)}
                key={index}
                {...page}
              >
                {page.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis className={styles.item} key={index} index={index}>
                &#8230;
              </ArkPagination.Ellipsis>
            ),
          )}
          <ArkPagination.NextTrigger className={styles.item}>
            <MdKeyboardArrowRight size="1.5rem" color="inherit" />
          </ArkPagination.NextTrigger>
        </>
      )}
    </ArkPagination.Root>
  );
}

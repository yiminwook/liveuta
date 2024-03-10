'use client';
import { SETLIST_PAGE_SIZE } from '@/const';
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import Pagination from '@inner/_component/Pagination';
import Loading from '@inner/loading';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import Row from './Row';
import * as styles from './table.css';
import { GET } from '@inner/_action/setlist';
import { Session } from 'next-auth';

type TableProps = {
  searchParams: {
    query: string;
    page: number;
    order: 'broadcast' | 'create';
  };
  channelDataset: ChannelDataset;
  session: Session | null;
};

export default function Table({ session, searchParams, channelDataset }: TableProps) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['searchSetlist', searchParams],
    queryFn: () =>
      GET({
        accessToken: session?.user.accessToken || null,
        query: searchParams.query,
        startRow: (searchParams.page - 1) * SETLIST_PAGE_SIZE,
        orderType: searchParams.order === 'create' ? 'CREATE_AT' : 'BROADCAST_AT',
        isFavorite: false,
      }),
  });

  const handlePage = (page: number) => {
    router.push(`/setlist?query=${searchParams.query}&page=${page}&order=${searchParams.order}`);
  };

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={cx(styles.headerCell)}>썸네일</div>
          <div className={styles.headerCell}>채널명</div>
          <div className={cx(styles.headerCell, 'flex2')}>제목</div>
          <div className={styles.headerCell}>
            {searchParams.order === 'create' ? '작성일' : '방송일'}
          </div>
        </div>
        <div className={styles.body}>
          {data.list.map((data) => (
            <Row
              key={data.videoId}
              setlist={data}
              channel={channelDataset[data.channelId]}
              order={searchParams.order}
            />
          ))}
        </div>
        <div className={styles.pagenationBox}>
          <Pagination
            count={data.total}
            pageSize={SETLIST_PAGE_SIZE}
            sliblingCount={1}
            currentPage={searchParams.page}
            onPageChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
}

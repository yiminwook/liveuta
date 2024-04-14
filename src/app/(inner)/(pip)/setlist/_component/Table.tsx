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
import { Session } from 'next-auth';
import Nodata from '@inner/_component/Nodata';
import axios, { AxiosHeaders } from 'axios';
import { GetSetlistRes } from '@api/setlist/route';

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
    queryFn: async () => {
      const query = new URLSearchParams();
      query.set('query', searchParams.query);
      query.set('start', ((searchParams.page - 1) * SETLIST_PAGE_SIZE).toString());
      query.set('order', searchParams.order);
      query.set('isFavorite', 'false');
      const headers = new AxiosHeaders();
      if (session) {
        headers.set('Authorization', `Bearer ${session.user.accessToken}`);
      }
      return axios
        .get<GetSetlistRes>(`/api/setlist?${query.toString()}`, {
          headers,
        })
        .then((res) => res.data.data);
    },
  });

  const handlePage = (page: number) => {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', page.toString());
    query.set('order', searchParams.order);
    router.push(`/setlist?${query.toString()}`);
  };

  if (isLoading) return <Loading />;

  if (!data) return <Nodata />;

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
          {data.list.length === 0 && <Nodata />}
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

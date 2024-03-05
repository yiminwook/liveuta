'use client';
import { SETLIST_PAGE_SIZE } from '@/const';
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import Pagination from '@inner/_component/Pagination';
import Loading from '@inner/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import Row from './Row';
import * as styles from './list.css';

interface ListProps {
  searchParams: {
    query: string;
    page: number;
  };
  channelDataset: ChannelDataset;
}

export default function List({ searchParams, channelDataset }: ListProps) {
  const router = useRouter();

  const handlePage = (page: number) => {
    router.push(`/setlist?query=${searchParams.query}&page=${page}`);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['searchSetlist', searchParams],
    queryFn: async () => {
      const result = await axios.get<{
        maxPage: number;
        list: Setlist[];
      }>(`/api/search/setlist?query=${searchParams.query}&page=${searchParams.page}`);
      return result.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <div>
        <h2 className={styles.title}>조회 리스트</h2>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>조회 리스트</h2>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={cx(styles.headerCell)}>썸네일</div>
          <div className={styles.headerCell}>채널명</div>
          <div className={cx(styles.headerCell, 'flex2')}>방송</div>
          <div className={styles.headerCell}>방송일</div>
        </div>
        <div className={styles.body}>
          {data.list.map((data) => (
            <Row key={data.videoId} setlist={data} channel={channelDataset[data.channelId]} />
          ))}
        </div>
        <div className={styles.pagenationBox}>
          <Pagination
            count={SETLIST_PAGE_SIZE * data.maxPage}
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

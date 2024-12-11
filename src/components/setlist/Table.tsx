'use client';
import Nodata from '@/components/common/Nodata';
import * as loadingStyles from '@/components/common/loading/loading.css';
import { SETLIST_PAGE_SIZE } from '@/constants';
import { ChannelDataset } from '@/libraries/mongoDB/getAllChannel';
import { GetSetlistRes } from '@/types/api/setlist';
import { Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosHeaders } from 'axios';
import cx from 'classnames';
import { Session } from 'next-auth';
import { useTransitionRouter } from 'next-view-transitions';
import Wave from '../common/loading/Wave';
import Row from './Row';
import css from './Table.module.scss';

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
  const router = useTransitionRouter();

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

      const res = await axios.get<GetSetlistRes>(`/api/v1/setlist?${query.toString()}`, {
        headers,
      });

      const data = res.data.data;
      return {
        list: data.list,
        totalPage: Math.ceil(data.total / SETLIST_PAGE_SIZE),
      };
    },
  });

  const handlePage = (page: number) => {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', page.toString());
    query.set('order', searchParams.order);
    router.push(`/setlist?${query.toString()}`);
  };

  if (isLoading)
    return (
      <div className={loadingStyles.loadingWrap}>
        <Wave />
      </div>
    );

  if (!data) return <Nodata />;

  return (
    <div>
      <div className={css.table}>
        <div className={css.header}>
          <div className={css.headerCell}>썸네일</div>
          <div className={css.headerCell}>채널명</div>
          <div className={cx(css.headerCell, css.flex2)}>제목</div>
          <div className={css.headerCell}>
            {searchParams.order === 'create' ? '작성일' : '방송일'}
          </div>
        </div>
        <div className={css.body}>
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
        <div className={css.paginationBox}>
          <Pagination
            total={data.totalPage}
            siblings={1}
            value={searchParams.page}
            onChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
}

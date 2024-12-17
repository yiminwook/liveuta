'use client';
import Nodata from '@/components/common/Nodata';
import loadingCss from '@/components/common/loading/Loading.module.scss';
import { SETLIST_PAGE_SIZE } from '@/constants';
import { ChannelDataset } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { GetSetlistRes } from '@/types/api/setlist';
import { Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosHeaders } from 'axios';
import cx from 'classnames';
import { Data, Effect } from 'effect';
import { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import { useTransitionRouter } from 'next-view-transitions';
import Wave from '../common/loading/Wave';
import Row from './Row';
import css from './Table.module.scss';

class AxiosFetchError extends Data.Error<{ cause: Error }> {}

type TableProps = {
  searchParams: {
    query: string;
    page: number;
    order: 'broadcast' | 'create';
  };
  channelDataset: ChannelDataset;
  session: Session | null;
};

function getSetListByQuery(query: string, headers: AxiosHeaders) {
  return Effect.tryPromise({
    try: () =>
      axios.get<GetSetlistRes>(`/api/v1/setlist?${query}`, {
        headers,
      }),
    catch: () =>
      new AxiosFetchError({
        cause: new Error('Cannot fetch set list'),
      }),
  });
}

type DataType = {
  list: Setlist[];
  totalPage: number;
};

export default function Table({ session, searchParams, channelDataset }: TableProps) {
  const router = useRouter(useTransitionRouter);

  const { data, isLoading } = useQuery({
    queryKey: ['searchSetlist', searchParams],
    queryFn: async () => {
      const program = Effect.gen(function* (_) {
        const query = new URLSearchParams();
        query.set('query', searchParams.query);
        query.set('start', ((searchParams.page - 1) * SETLIST_PAGE_SIZE).toString());
        query.set('order', searchParams.order);
        query.set('isFavorite', 'false');
        const headers = new AxiosHeaders();

        if (session) {
          headers.set('Authorization', `Bearer ${session.user.accessToken}`);
        }

        const res = yield* _(getSetListByQuery(query.toString(), headers));

        const data = res.data.data;

        const returnValue: DataType = {
          list: data.list,
          totalPage: Math.ceil(data.total / SETLIST_PAGE_SIZE),
        };

        return returnValue;
      });
      // .pipe(
      //   Effect.catchAllCause((cause) => {
      //     const isFailure = Cause.isFailType(cause);

      //     if (isFailure) {
      //       console.error(cause.error.message);
      //     } else {
      //       console.error('Unknown error occurred');
      //     }

      //     const returnValue: DataType = {
      //       list: [],
      //       totalPage: 0,
      //     };

      //     return Effect.succeed(returnValue);
      //   }),
      // );

      const result = await Effect.runPromise(program);

      return result;
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
      <div className={loadingCss.loadingWrap}>
        <Wave />
      </div>
    );

  if (!data || data.list.length === 0) return <Nodata />;

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

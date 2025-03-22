'use client';
import Nodata from '@/components/common/Nodata';
import loadingCss from '@/components/common/loading/Loading.module.scss';
import Wave from '@/components/common/loading/Wave';
import { SETLIST_PAGE_SIZE } from '@/constants';
import useCachedData from '@/hooks/useCachedData';
import type { Setlist } from '@/libraries/oracleDB/setlist/service';
import type { GetSetlistRes } from '@/types/api/setlist';
import { Pagination, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosHeaders } from 'axios';
import cx from 'classnames';
import { Cause, Data, Effect } from 'effect';
import type { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import SetlistDrawer from './Drawer';
import { DrawerProvider } from './DrawerContext';
import Row from './Row';
import css from './Table.module.scss';

class AxiosFetchError extends Data.Error<{ cause: Error }> {}

type TableProps = {
  searchParams: {
    query: string;
    page: number;
    sort: 'broadcast' | 'create';
  };
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

export default function SetlistTable({ session, searchParams }: TableProps) {
  const { channelMap } = useCachedData({ session });
  const router = useRouter();
  const t = useTranslations();

  const { data, isLoading } = useQuery({
    queryKey: ['searchSetlist', searchParams],
    queryFn: async () => {
      const program = Effect.gen(function* (_) {
        const query = new URLSearchParams();
        query.set('query', searchParams.query);
        query.set('start', ((searchParams.page - 1) * SETLIST_PAGE_SIZE).toString());
        query.set('sort', searchParams.sort);
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
      }).pipe(
        Effect.catchAllCause((cause) => {
          const isFailure = Cause.isFailType(cause);

          if (isFailure) {
            console.error(cause.error.message);
          } else {
            console.error('Unknown error occurred');
          }

          return Effect.fail(cause);
        }),
      );

      const result = await Effect.runPromise(program);

      return result;
    },
  });

  const handlePage = (page: number) => {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', page.toString());
    query.set('sort', searchParams.sort);
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
    <DrawerProvider>
      <Table className={css.table} highlightOnHover>
        <Table.Thead className={css.head}>
          <Table.Tr className={css.headRow}>
            <Table.Td className={cx(css.headCell, css.thumbnail)} />
            <Table.Td className={cx(css.headCell, css.channel)}>
              {t('setlist.table.headCellChannel')}
            </Table.Td>
            <Table.Td className={cx(css.headCell, css.title)}>
              {t('setlist.table.headCellTitle')}
            </Table.Td>
            <Table.Td className={cx(css.headCell, css.time)}>
              {searchParams.sort === 'create'
                ? t('setlist.table.sortCreate')
                : t('setlist.table.sortBroadcast')}
            </Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={css.body}>
          {data.list.map((setlist) => (
            <Row key={setlist.videoId} setlist={setlist} channel={channelMap[setlist.channelId]} />
          ))}
        </Table.Tbody>
      </Table>
      <div className={css.paginationBox}>
        <Pagination
          total={data.totalPage}
          siblings={1}
          value={searchParams.page}
          onChange={handlePage}
        />
      </div>
      {/* TODO - 데스크탑에서는 Modal 사용 */}
      <SetlistDrawer />
    </DrawerProvider>
  );
}

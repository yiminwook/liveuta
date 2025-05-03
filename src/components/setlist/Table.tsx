'use client';
import { clientApi } from '@/apis/fetcher';
import Nodata from '@/components/common/Nodata';
import loadingCss from '@/components/common/loading/Loading.module.scss';
import Wave from '@/components/common/loading/Wave';
import { SETLIST_PAGE_SIZE } from '@/constants';
import { SETLISTS_TAG } from '@/constants/revalidate-tag';
import useCachedData from '@/hooks/use-cached-data';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import type { Setlist } from '@/libraries/oracledb/setlist/service';
import type { GetSetlistRes } from '@/types/api/setlist';
import { Pagination, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import type { Session } from 'next-auth';
import { useRouter } from 'next-nprogress-bar';
import SetlistDrawer from './Drawer';
import { DrawerProvider } from './DrawerContext';
import Row from './Row';
import css from './Table.module.scss';

type TableProps = {
  searchParams: {
    query: string;
    page: number;
    sort: 'broadcast' | 'create';
  };
  session: Session | null;
};

type DataType = {
  list: Setlist[];
  totalPage: number;
};

export default function SetlistTable({ session, searchParams }: TableProps) {
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslations();
  const { channelMap } = useCachedData({ session });

  const { data, isLoading } = useQuery({
    queryKey: [SETLISTS_TAG, searchParams],
    queryFn: async () => {
      const query = new URLSearchParams();
      query.set('query', searchParams.query);
      query.set('start', ((searchParams.page - 1) * SETLIST_PAGE_SIZE).toString());
      query.set('sort', searchParams.sort);
      query.set('isFavorite', 'false');

      const json = await clientApi
        .get<GetSetlistRes>(`v1/setlist?${query.toString()}`, {
          headers: {
            Authorization: session ? `Bearer ${session.user.accessToken}` : '',
          },
        })
        .json();

      const returnValue: DataType = {
        list: json.data.list,
        totalPage: Math.ceil(json.data.total / SETLIST_PAGE_SIZE),
      };

      return returnValue;
    },
  });

  const handlePage = (page: number) => {
    const query = new URLSearchParams();
    query.set('query', searchParams.query);
    query.set('page', page.toString());
    query.set('sort', searchParams.sort);
    router.push(`/${locale}/setlist?${query.toString()}`);
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

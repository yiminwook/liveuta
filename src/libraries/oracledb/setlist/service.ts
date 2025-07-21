import 'server-only';
import { SETLIST_PAGE_SIZE } from '@/constants';
import dayjs from '@/libraries/dayjs';
import CustomServerError from '@/libraries/error/customServerError';
import { getYoutubeChannelsByUid } from '@/libraries/youtube';
import { DBError } from 'oracledb';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type SetlistRow = [
  string, //videoId
  string, //description
  number, //memberId = 편집자
  Date, // createAt
  Date, // updateAt
  string, // channelId
  Date, // broadcastAt
  string, // title
  string, // email = 편집자
];

export type Setlist = {
  videoId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  broadcastAt: string;
  title: string;
  channelId: string;
};

const parseSetlistRow = (row: SetlistRow): Setlist => ({
  channelId: row[5],
  videoId: row[0],
  title: row[7],
  description: row[1],
  createdAt: dayjs(row[3]).toISOString(),
  updatedAt: dayjs(row[4]).toISOString(),
  broadcastAt: dayjs(row[6]).toISOString(),
});

export const getSetlistByVideoId = withOracleConnection(async (connection, videoId: string) => {
  const result = await connection.execute<SetlistRow>(sql.GET_SETLIST, [videoId]);
  const row = result.rows?.[0];
  if (!row) return null;
  const youtubeData = await getYoutubeChannelsByUid(row[5]);
  const parsed = parseSetlistRow(row);

  return {
    setlist: parsed,
    channelIcon: youtubeData.items?.[0].snippet?.thumbnails?.default?.url ?? '/loading.png',
  };
});

export const getAllSetlist = withOracleConnection(
  async (
    connection,
    arg: {
      startRow: number;
      /** 세션에서 가져오는 id */
      memberId: number;
      orderType: sql.SetlistOrder;
      isFavorite: boolean;
    },
  ) => {
    const maxCountSql = arg.isFavorite ? sql.GET_MAX_COUNT_WITH_WHITELIST : sql.GET_MAX_COUNT;
    const countResult = await connection.execute<[number]>(maxCountSql, [arg.memberId]);
    const total = countResult.rows?.[0][0] || 0;

    if (total === 0 || arg.startRow >= total) {
      return { total, list: [] };
    }

    const searchSql = arg.isFavorite
      ? sql.GET_ALL_SETLIST_WITH_WHITELIST(arg.orderType)
      : sql.GET_ALL_SETLIST(arg.orderType);
    const searchResult = await connection.execute<SetlistRow>(searchSql, [
      arg.memberId,
      arg.startRow,
      SETLIST_PAGE_SIZE,
    ]);

    const rows = searchResult.rows;

    if (!rows) {
      return { total, list: [] };
    }

    const list = rows.map((row) => parseSetlistRow(row));
    return { total, list };
  },
);

export const searchSetlist = withOracleConnection(
  async (
    connection,
    arg: {
      query: string;
      startRow: number;
      memberId: number;
      orderType: sql.SetlistOrder;
      isFavorite: boolean;
    },
  ) => {
    const pattern = arg.query.toLowerCase();
    const maxCountSql = arg.isFavorite ? sql.SEARCH_MAX_COUNT_WITH_WHITELIST : sql.SEARCH_MAX_COUNT;
    const countResult = await connection.execute<[number]>(maxCountSql, [arg.memberId, pattern]);
    const total = countResult.rows?.[0][0] || 0;

    if (total === 0 || arg.startRow >= total) {
      return { total, list: [] };
    }

    const searchSql = arg.isFavorite
      ? sql.SEARCH_SETLIST_WITH_WHITELIST(arg.orderType)
      : sql.SEARCH_SETLIST(arg.orderType);

    const searchResult = await connection.execute<SetlistRow>(searchSql, [
      arg.memberId,
      pattern,
      arg.startRow,
      SETLIST_PAGE_SIZE,
    ]);

    const rows = searchResult.rows;

    if (!rows) {
      return { total, list: [] };
    }

    const list = rows.map((row) => parseSetlistRow(row));
    return { total, list };
  },
);

export const postSetlist = withOracleConnection(
  async (
    connection,
    arg: {
      videoId: string;
      description: string;
      memberId: number;
      channelId: string;
      broadcastAt: string | null | undefined;
      title: string;
    },
  ) => {
    try {
      const nonullableBroadcastAt = dayjs(arg.broadcastAt || undefined).toDate();

      await connection.execute(sql.POST_SETLIST, [
        arg.videoId,
        arg.description,
        arg.memberId,
        arg.channelId,
        nonullableBroadcastAt,
        arg.title,
      ]);

      await connection.commit();
    } catch (e) {
      const error = e as DBError;
      connection.rollback();

      if (error.code === 'ORA-00001') {
        throw new CustomServerError({ statusCode: 409, message: '이미 등록된 세트리 입니다.' });
      }

      throw error;
    }
  },
);

export const updateSetlist = withOracleConnection(
  async (
    connection,
    arg: {
      videoId: string;
      description: string;
      memberId: number;
      channelId: string;
      broadcastAt: string | null | undefined;
      title: string;
    },
  ) => {
    try {
      const nonullableBroadcastAt = dayjs(arg.broadcastAt || undefined).toDate();

      await connection.execute(sql.UPDATE_SETLIST, [
        arg.title,
        arg.description,
        arg.channelId,
        arg.memberId,
        nonullableBroadcastAt,
        arg.videoId,
      ]);

      await connection.commit();
    } catch (error) {
      connection.rollback();
      throw error;
    }
  },
);

export const deleteSetlist = withOracleConnection(async (connection, videoId: string) => {
  try {
    await connection.execute(sql.DELETE_SETLIST, [videoId]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
});

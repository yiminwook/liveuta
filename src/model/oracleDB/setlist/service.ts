import { DBError } from 'oracledb';
import { connectOracleDB } from '../connection';
import * as sql from './sql';
import CustomServerError from '@/model/error/customServerError';
import dayjs from '@/model/dayjs';
import { SETLIST_PAGE_SIZE } from '@/const';

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
  createdAt: dayjs.tz(row[3]).toISOString(),
  updatedAt: dayjs.tz(row[4]).toISOString(),
  broadcastAt: dayjs.tz(row[6]).toISOString(),
});

export async function getSetlistByVideoId(videoId: string) {
  const connection = await connectOracleDB();
  const result = await connection.execute<SetlistRow>(sql.GET_SETLIST, [videoId]);
  const row = result.rows?.[0];
  if (!row) return null;
  return parseSetlistRow(row);
}

export async function getAllSetlist(arg: {
  startRow: number;
  /** 세션에서 가져오는 id */
  memberId: number;
  orderType: sql.SetlistOrder;
  isFavorite: boolean;
}) {
  const connection = await connectOracleDB();
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
}

export async function searchSetlist(arg: {
  query: string;
  startRow: number;
  memberId: number;
  orderType: sql.SetlistOrder;
  isFavorite: boolean;
}) {
  const connection = await connectOracleDB();
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
}

export async function postSetlist(
  videoId: string,
  description: string,
  memberId: number,
  channelId: string,
  broadcastAt: string | null | undefined,
  title: string,
) {
  const connection = await connectOracleDB();
  try {
    const nonullableBroadcastAt = dayjs.tz(broadcastAt || undefined).toDate();

    await connection.execute(sql.POST_SETLIST, [
      videoId,
      description,
      memberId,
      channelId,
      nonullableBroadcastAt,
      title,
    ]);

    await connection.commit();
  } catch (e) {
    const error = e as DBError;

    if (error.code === 'ORA-00001') {
      throw new CustomServerError({ statusCode: 409, message: '이미 등록된 세트리 입니다.' });
    }

    throw error;
  }
}

export async function updateSetlist(
  videoId: string,
  description: string,
  memberId: number,
  channelId: string,
  broadcastAt: string | null | undefined,
  title: string,
) {
  const connection = await connectOracleDB();
  const nonullableBroadcastAt = dayjs.tz(broadcastAt || undefined).toDate();
  await connection.execute(sql.UPDATE_SETLIST, [
    title,
    description,
    channelId,
    memberId,
    nonullableBroadcastAt,
    videoId,
  ]);
  await connection.commit();
}

export async function deleteSetlist(videoId: string) {
  const connection = await connectOracleDB();
  await connection.execute(sql.DELETE_SETLIST, [videoId]);
  await connection.commit();
}

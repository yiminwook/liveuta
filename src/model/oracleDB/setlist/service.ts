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
  number, // maxCount
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
  try {
    const result = await connection.execute<SetlistRow>(sql.GET_SETLIST, [videoId]);
    await connection.close();

    const row = result.rows?.[0];
    if (!row) return null;

    return parseSetlistRow(row);
  } catch (error) {
    await connection.close();
    throw error;
  }
}

export async function getAllSetlist(arg: {
  startRow: number;
  /** 세션에서 가져오는 id */
  memberId: number;
  orderType: sql.SetlistOrderType;
}) {
  const connection = await connectOracleDB();

  try {
    const countResult = await connection.execute<[number]>(sql.GET_MAX_COUNT, [arg.memberId]);
    const total = countResult.rows?.[0][0] || 0;

    if (total === 0 || arg.startRow >= total) {
      await connection.close();
      return { total, list: [] };
    }

    const searchResult = await connection.execute<SetlistRow>(sql.GET_ALL_SETLIST(arg.orderType), [
      arg.memberId,
      arg.startRow,
      SETLIST_PAGE_SIZE,
    ]);

    await connection.close();

    const rows = searchResult.rows;

    if (!rows) {
      await connection.close();
      return { total, list: [] };
    }

    const list = rows.map((row) => parseSetlistRow(row));
    return { total, list };
  } catch (error) {
    await connection.close();
    throw error;
  }
}

export async function searchSetlist(arg: {
  query: string;
  startRow: number;
  memberId: number;
  orderType: sql.SetlistOrderType;
}) {
  const connection = await connectOracleDB();
  const pattern = arg.query.toLowerCase();
  try {
    const countResult = await connection.execute<[number]>(sql.SEARCH_MAX_COUNT, [
      arg.memberId,
      pattern,
    ]);
    const total = countResult.rows?.[0][0] || 0;

    if (total === 0 || arg.startRow >= total) {
      await connection.close();
      return { total, list: [] };
    }

    const searchResult = await connection.execute<SetlistRow>(sql.SEARCH_SETLIST(arg.orderType), [
      arg.memberId,
      pattern,
      arg.startRow,
      SETLIST_PAGE_SIZE,
    ]);

    await connection.close();

    const rows = searchResult.rows;

    if (!rows) {
      await connection.close();
      return { total, list: [] };
    }

    const list = rows.map((row) => parseSetlistRow(row));
    return { total, list };
  } catch (error) {
    await connection.close();
    throw error;
  }
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
    await connection.close();
  } catch (e) {
    const error = e as DBError;
    await connection.rollback();
    await connection.close();

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
  try {
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
    await connection.close();
  } catch (error) {
    await connection.rollback();
    await connection.close();

    throw error;
  }
}

export async function deleteSetlist(videoId: number) {
  const connection = await connectOracleDB();
  try {
    await connection.execute(sql.DELETE_SETLIST, [videoId]);
    await connection.commit();
    await connection.close();
  } catch (error) {
    await connection.rollback();
    await connection.close();

    throw error;
  }
}

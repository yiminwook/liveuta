import OracleDB, { DBError } from 'oracledb';
import { connectOracleDB } from '../connection';
import {
  DELETE_SETLIST,
  GET_ALL_SETLIST,
  GET_MAX_COUNT,
  GET_SETLIST,
  POST_SETLIST,
  SEARCH_MAX_COUNT,
  SEARCH_SETLIST,
  UPDATE_SETLIST,
} from './sql';
import CustomServerError from '@/model/error/customServerError';
import dayjs from '@/model/dayjs';

const PAGE_SIZE = 15;

export type SetlistRow = [
  string, //videoId
  string, //description
  number, //memberId = 편집자
  Date, // createAt
  Date, // updateAt
  string, // channelId
  Date, // broadcastAt
  string, // email = 편집자
  number | undefined, // RNUM
];

export type Setlist = {
  videoId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  broadcastAt: string;
  channelId: string;
};

const parseSetlistRow = (row: SetlistRow): Setlist => ({
  channelId: row[5],
  videoId: row[0],
  description: row[1],
  createdAt: dayjs.tz(row[3]).toISOString(),
  updatedAt: dayjs.tz(row[4]).toISOString(),
  broadcastAt: dayjs.tz(row[6]).toISOString(),
});

export async function getSetlistByVideoId(videoId: number) {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();
    const result = await connection.execute<SetlistRow>(GET_SETLIST, [videoId]);
    await connection.close();

    const row = result.rows?.[0];
    if (!row) return null;

    return parseSetlistRow(row);
  } catch (error) {
    if (connection) await connection.close();
    throw error;
  }
}

export async function getAllSetlist(pageNumber: number) {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();
    const countResult = await connection.execute<[number]>(GET_MAX_COUNT);
    const totalCount = countResult.rows?.[0][0] || 0;
    const maxPage = Math.ceil(totalCount / PAGE_SIZE);

    if (maxPage === 0 || pageNumber > maxPage) {
      await connection.close();
      return { maxPage: 0, list: [] };
    }

    const startRow = (pageNumber - 1) * PAGE_SIZE + 1;
    const endRow = pageNumber * PAGE_SIZE;

    const searchResult = await connection.execute<SetlistRow>(GET_ALL_SETLIST, [endRow, startRow]);

    await connection.close();

    const rows = searchResult.rows;
    if (!rows) {
      await connection.close();
      return { maxPage: 0, list: [] };
    }

    const list = rows.map((row) => parseSetlistRow(row));
    return { maxPage, list };
  } catch (error) {
    if (connection) await connection.close();
    throw error;
  }
}

export async function searchSetlist(query: string, pageNumber: number) {
  let connection: OracleDB.Connection | null = null;
  const pattern = `%${query}%`;
  try {
    connection = await connectOracleDB();
    const countResult = await connection.execute<[number]>(SEARCH_MAX_COUNT, [pattern]);
    const totalCount = countResult.rows?.[0][0] || 0;
    const maxPage = Math.ceil(totalCount / PAGE_SIZE);

    if (maxPage === 0 || pageNumber > maxPage) {
      await connection.close();
      return { maxPage: 0, list: [] };
    }

    const startRow = (pageNumber - 1) * PAGE_SIZE + 1;
    const endRow = pageNumber * PAGE_SIZE;

    const searchResult = await connection.execute<SetlistRow>(SEARCH_SETLIST, [
      pattern,
      endRow,
      startRow,
    ]);

    await connection.close();

    const rows = searchResult.rows;
    if (!rows) {
      await connection.close();
      return { maxPage: 0, list: [] };
    }

    const list = rows.map((row) => parseSetlistRow(row));
    return { maxPage, list };
  } catch (error) {
    if (connection) await connection.close();
    throw error;
  }
}

export async function postSetlist(
  videoId: string,
  description: string,
  memberId: number,
  channelId: string,
  broadcastAt: string | null | undefined,
) {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();

    const nonullableBroadcastAt = dayjs.tz(broadcastAt || undefined).toDate();

    await connection.execute(POST_SETLIST, [
      videoId,
      description,
      memberId,
      channelId,
      nonullableBroadcastAt,
    ]);

    await connection.commit();
    await connection.close();
  } catch (e) {
    const error = e as DBError;

    if (connection) {
      await connection.rollback();
      await connection.close();
    }

    if (error.code === 'ORA-00001') {
      throw new CustomServerError({ statusCode: 409, message: '이미 등록된 세트리 입니다.' });
    }

    throw error;
  }
}

export async function updateSetlist(videoId: number, description: string, memberId: number) {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();
    await connection.execute(UPDATE_SETLIST, [videoId, description, memberId]);
    await connection.commit();
    await connection.close();
  } catch (error) {
    if (connection) {
      await connection.rollback();
      await connection.close();
    }
    throw error;
  }
}

export async function deleteSetlist(videoId: number) {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();
    await connection.execute(DELETE_SETLIST, [videoId]);
    await connection.commit();
    await connection.close();
  } catch (error) {
    if (connection) {
      await connection.rollback();
      await connection.close();
    }
    throw error;
  }
}

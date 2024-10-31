import { connectOracleDB } from '../connection';
import * as sql from './sql';
import CustomServerError from '@/libraries/error/customServerError';

export type BlacklistRow = [
  number, //memberId
  string, //channelId
];

export type Blacklist = string[];

export async function isBlackList(arg: { memberId: number; channelId: string }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute<[number]>(sql.IS_BLACKLIST, [
      arg.memberId,
      arg.channelId,
    ]);

    await connection.close();
    const maxCount = result.rows?.[0][0] || 0;
    return maxCount > 0;
  } catch (error) {
    await connection.close();
    throw error;
  }
}

export async function getAllBlackList(arg: { memberId: number }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute<BlacklistRow>(sql.GET_ALL_BLACKLIST, [arg.memberId]);

    await connection.close();
    const channelList = result.rows?.map((row) => row[1]) || [];

    return channelList;
  } catch (error) {
    await connection.close();
    throw error;
  }
}

export async function postBlacklist(arg: { memberId: number; channelId: string }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute(sql.POST_BLACKLIST, [
      arg.memberId,
      arg.channelId,
      arg.memberId,
      arg.channelId,
    ]);
    if (result.rowsAffected === 0) {
      throw new CustomServerError({ statusCode: 400, message: '블록된 채널입니다.' });
    }
    await connection.commit();
    await connection.close();
    return arg.channelId;
  } catch (error) {
    await connection.rollback();
    await connection.close();
    throw error;
  }
}

export async function deleteBlacklist(arg: { memberId: number; channelId: string }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute(sql.DELETE_BLACKLIST, [arg.memberId, arg.channelId]);
    if (result.rowsAffected === 0) {
      throw new CustomServerError({ statusCode: 400, message: '취소된 채널입니다.' });
    }
    await connection.commit();
    await connection.close();
    return arg.channelId;
  } catch (error) {
    await connection.rollback();
    await connection.close();
    throw error;
  }
}

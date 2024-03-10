'use server';
import { connectOracleDB } from '../connection';
import * as sql from './sql';
import CustomServerError from '@/model/error/customServerError';

export type WhitelistRow = [
  number, //memberId
  string, //channelId
];

export type Whitelist = string[];

export async function isWhiteList(arg: { memberId: number; channelId: string }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute<[number]>(sql.IS_WHITELIST, [
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

export async function getAllWhiteList(arg: { memberId: number }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute<WhitelistRow>(sql.GET_ALL_WHITELIST, [arg.memberId]);

    await connection.close();
    const channelList = result.rows?.map((row) => row[1]) || [];

    return channelList;
  } catch (error) {
    await connection.close();
    throw error;
  }
}

export async function postWhitelist(arg: { memberId: number; channelId: string }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute(sql.POST_WHITELIST, [
      arg.memberId,
      arg.channelId,
      arg.memberId,
      arg.channelId,
    ]);
    if (result.rowsAffected === 0) {
      throw new CustomServerError({ statusCode: 400, message: '등록된 채널입니다.' });
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

export async function deleteWhitelist(arg: { memberId: number; channelId: string }) {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute(sql.DELETE_WHITELIST, [arg.memberId, arg.channelId]);
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

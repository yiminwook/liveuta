import CustomServerError from '@/libraries/error/customServerError';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type WhitelistRow = [
  number, //memberId
  string, //channelId
];

export type Whitelist = string[];

export const isWhiteList = withOracleConnection(
  async (connection, arg: { memberId: number; channelId: string }) => {
    const result = await connection.execute<[number]>(sql.IS_WHITELIST, [
      arg.memberId,
      arg.channelId,
    ]);

    const maxCount = result.rows?.[0][0] || 0;
    return maxCount > 0;
  },
);

export const getAllWhiteList = withOracleConnection(
  async (connection, arg: { memberId: number }) => {
    const result = await connection.execute<WhitelistRow>(sql.GET_ALL_WHITELIST, [arg.memberId]);

    const channelList = result.rows?.map((row) => row[1]) || [];
    return channelList;
  },
);

export const postWhitelist = withOracleConnection(
  async (connection, arg: { memberId: number; channelId: string }) => {
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
      return arg.channelId;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

export const deleteWhitelist = withOracleConnection(
  async (connection, arg: { memberId: number; channelId: string }) => {
    try {
      const result = await connection.execute(sql.DELETE_WHITELIST, [arg.memberId, arg.channelId]);
      if (result.rowsAffected === 0) {
        throw new CustomServerError({ statusCode: 400, message: '취소된 채널입니다.' });
      }
      await connection.commit();
      return arg.channelId;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

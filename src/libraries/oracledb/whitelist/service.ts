import 'server-only';
import CustomServerError from '@/libraries/error/customServerError';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type WhitelistRow = [
  string, //channelId
  string, //memberEmail
];

export type Whitelist = string[];

export const isWhiteList = withOracleConnection(
  async (connection, arg: { memberEmail: string; channelId: string }) => {
    const result = await connection.execute<[number]>(sql.IS_WHITELIST, [
      arg.memberEmail,
      arg.channelId,
    ]);

    const maxCount = result.rows?.[0][0] || 0;
    return maxCount > 0;
  },
);

export const getAllWhiteList = withOracleConnection(
  async (connection, arg: { memberEmail: string }) => {
    const result = await connection.execute<WhitelistRow>(sql.GET_ALL_WHITELIST, [arg.memberEmail]);

    const channelList = result.rows?.map((row) => row[0]) || [];
    return channelList;
  },
);

export const postWhitelist = withOracleConnection(
  async (connection, arg: { memberEmail: string; channelId: string }) => {
    try {
      const result = await connection.execute(sql.POST_WHITELIST, [
        arg.memberEmail,
        arg.channelId,
        arg.memberEmail,
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
  async (connection, arg: { memberEmail: string; channelId: string }) => {
    try {
      const result = await connection.execute(sql.DELETE_WHITELIST, [
        arg.memberEmail,
        arg.channelId,
      ]);
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

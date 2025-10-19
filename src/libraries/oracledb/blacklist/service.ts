import 'server-only';
import CustomServerError from '@/libraries/error/customServerError';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type BlacklistRow = [
  string, //channelId
  string, //memberEmail
];

export type Blacklist = string[];

export const isBlackList = withOracleConnection(
  async (connection, arg: { memberEmail: string; channelId: string }) => {
    const result = await connection.execute<[number]>(sql.IS_BLACKLIST, [
      arg.memberEmail,
      arg.channelId,
    ]);

    const maxCount = result.rows?.[0][0] || 0;
    return maxCount > 0;
  },
);

export const getAllBlackList = withOracleConnection(
  async (connection, arg: { memberEmail: string }) => {
    const result = await connection.execute<BlacklistRow>(sql.GET_ALL_BLACKLIST, [arg.memberEmail]);

    const channelList = result.rows?.map((row) => row[0]) || [];
    return channelList;
  },
);

export const postBlacklist = withOracleConnection(
  async (connection, arg: { memberEmail: string; channelId: string }) => {
    try {
      const result = await connection.execute(sql.POST_BLACKLIST, [
        arg.memberEmail,
        arg.channelId,
        arg.memberEmail,
        arg.channelId,
      ]);

      if (result.rowsAffected === 0) {
        throw new CustomServerError({ statusCode: 400, message: '블록된 채널입니다.' });
      }

      await connection.commit();
      return arg.channelId;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

export const deleteBlacklist = withOracleConnection(
  async (connection, arg: { memberEmail: string; channelId: string }) => {
    try {
      const result = await connection.execute(sql.DELETE_BLACKLIST, [
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

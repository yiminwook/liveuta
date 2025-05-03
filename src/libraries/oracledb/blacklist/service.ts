import CustomServerError from '@/libraries/error/customServerError';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type BlacklistRow = [
  number, //memberId
  string, //channelId
];

export type Blacklist = string[];

export const isBlackList = withOracleConnection(
  async (connection, arg: { memberId: number; channelId: string }) => {
    const result = await connection.execute<[number]>(sql.IS_BLACKLIST, [
      arg.memberId,
      arg.channelId,
    ]);

    const maxCount = result.rows?.[0][0] || 0;
    return maxCount > 0;
  },
);

export const getAllBlackList = withOracleConnection(
  async (connection, arg: { memberId: number }) => {
    const result = await connection.execute<BlacklistRow>(sql.GET_ALL_BLACKLIST, [arg.memberId]);

    const channelList = result.rows?.map((row) => row[1]) || [];
    return channelList;
  },
);

export const postBlacklist = withOracleConnection(
  async (connection, arg: { memberId: number; channelId: string }) => {
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
      return arg.channelId;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

export const deleteBlacklist = withOracleConnection(
  async (connection, arg: { memberId: number; channelId: string }) => {
    try {
      const result = await connection.execute(sql.DELETE_BLACKLIST, [arg.memberId, arg.channelId]);

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

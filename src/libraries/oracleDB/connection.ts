import { ORACLEDB_USER } from '@/constants';
import type * as OracleDB from 'oracledb';
import oracledb from 'oracledb';

export const connectOracleDB = async () => {
  const connection = await oracledb.getConnection({
    user: ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECTSTRING,
  });

  return connection;
};

export type OracleService<TArgs extends any[], TResult> = (
  connection: OracleDB.Connection,
  ...args: TArgs
) => Promise<TResult>;

/**
 * OracleDB 연결을 자동으로 관리하는 고차 함수.
 */
export function withOracleConnection<TArgs extends any[], TResult>(
  fn: OracleService<TArgs, TResult>,
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    let connection: OracleDB.Connection | null = null;

    try {
      connection = await connectOracleDB();

      if (!connection) {
        throw new Error('Failed to establish OracleDB connection.');
      }

      // `await`를 추가하여 비동기 함수의 에러를 catch 블록에서 잡을 수 있도록 함
      return await fn(connection, ...args);
    } catch (error) {
      console.error('Oracle Connection Wrapper Error:', error);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (closeErr) {
          console.error('Error closing Oracle connection:', closeErr);
        }
      }
    }
  };
}

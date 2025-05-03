'use server';
import dayjs from '@/libraries/dayjs';
import CustomServerError from '@/libraries/error/customServerError';
import { withOracleConnection } from '../connection';
import { GET_ONE_MEMBER, POST_MEMBER, UPDATE_MEMBER } from './sql';

export type MemberRow = [number, string, string, 'Y' | 'N', number, Date, Date, 'Y' | 'N'];

export type TMemberInfo = {
  userId: number;
  email: string;
  provider: string;
  userLv: number;
  createAt: dayjs.Dayjs;
  loginAt: dayjs.Dayjs;
};

export const getMember = withOracleConnection(
  async (
    connection,
    { email, provider }: { email: string; provider: string },
  ): Promise<TMemberInfo> => {
    const getresult = await connection.execute<MemberRow>(GET_ONE_MEMBER, [email, provider]);
    const row = getresult.rows?.[0];

    if (!row) {
      // 가입되지 않은 유저
      throw new CustomServerError({
        statusCode: 500,
        message: 'internalserver error code: 9000',
      });
    }

    if (row[3] === 'Y') {
      // 정지된 유저
      throw new CustomServerError({
        statusCode: 500,
        message: 'internalserver error code: 9001',
      });
    }

    if (row[7] === 'Y') {
      // 세션 만료 - DISCONNECT === "Y"
      throw new CustomServerError({ statusCode: 499, message: 'invalidate session' });
    }

    return {
      userId: row[0],
      email: row[1],
      provider: row[2],
      userLv: row[4],
      createAt: dayjs(row[5]),
      loginAt: dayjs(row[6]),
    };
  },
);

export const loginAndFindone = withOracleConnection(
  async (connection, { email, provider }: { email: string; provider: string }) => {
    try {
      const getresult = await connection.execute<MemberRow>(GET_ONE_MEMBER, [email, provider]);
      const currRow = getresult.rows?.[0];

      const isDisabled = currRow?.[3] === 'Y';
      if (isDisabled) throw new Error('정지된 유저입니다.');

      if (currRow) {
        // 이미 가입된 회원이면 로그인 시간을 업데이트
        await connection.execute(UPDATE_MEMBER, [email, provider]);
      } else {
        // 가입되지 않은 회원이면 회원가입
        await connection.execute(POST_MEMBER, [email, provider]);
      }

      await connection.commit();

      const registResult = await connection.execute<MemberRow>(GET_ONE_MEMBER, [email, provider]);
      const updatedRow = registResult.rows?.[0];

      if (!updatedRow) throw new Error('회원 정보가 없습니다.');
      if (updatedRow[7] === 'Y') throw new Error('DB 로그아웃');

      return {
        id: updatedRow[0],
        email: updatedRow[1],
        provider: updatedRow[2],
        lv: updatedRow[4],
        createAt: dayjs(updatedRow[5]),
        loginAt: dayjs(updatedRow[6]),
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

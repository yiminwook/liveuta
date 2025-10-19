import 'server-only';
import dayjs from '@/libraries/dayjs';
import CustomServerError from '@/libraries/error/customServerError';
import { withOracleConnection } from '../connection';
import { GET_ONE_MEMBER, POST_MEMBER, UPDATE_MEMBER } from './sql';

export type MemberRow = [
  string, //email
  string, //provider
  'Y' | 'N', //disabled
  number, //userLv
  Date, //createAt
  Date, //loginAt
  'Y' | 'N', //disconnect
];

export type TMemberInfo = {
  email: string;
  provider: string;
  userLv: number;
  createAt: dayjs.Dayjs;
  loginAt: dayjs.Dayjs;
};

export const getMember = withOracleConnection(
  async (connection, { email }: { email: string }): Promise<TMemberInfo> => {
    const getresult = await connection.execute<MemberRow>(GET_ONE_MEMBER, [email]);

    const row = getresult.rows?.[0];
    const isDisabled = row?.[2] === 'Y';
    const isDisconnect = row?.[6] === 'Y';

    if (!row) {
      // 가입되지 않은 유저
      throw new CustomServerError({
        statusCode: 500,
        message: '가입되지 않은 유저입니다.',
      });
    }

    if (isDisabled) {
      // 정지된 유저
      throw new CustomServerError({
        statusCode: 500,
        message: '제한된 계정입니다.',
      });
    }

    if (isDisconnect) {
      // 세션 만료 - DISCONNECT === "Y"
      throw new CustomServerError({ statusCode: 499, message: '세션이 만료되었습니다.' });
    }

    return {
      email: row[0],
      provider: row[1],
      // disabled: row[2],
      userLv: row[3],
      createAt: dayjs(row[4]),
      loginAt: dayjs(row[5]),
      // disconnect: row[6],
    };
  },
);

export const postMember = withOracleConnection(
  async (connection, { email }: { email: string }): Promise<void> => {
    try {
      const getresult = await connection.execute<MemberRow>(GET_ONE_MEMBER, [email]);
      const currRow = getresult.rows?.[0];

      const isDisabled = currRow?.[2] === 'Y';

      if (isDisabled) {
        // 정지된 유저
        throw new CustomServerError({
          statusCode: 500,
          message: '제한된 계정입니다.',
        });
      }

      if (currRow) {
        // 이미 가입된 회원이면 로그인 시간을 업데이트
        await connection.execute(UPDATE_MEMBER, [email]);
      } else {
        // 가입되지 않은 회원이면 회원가입
        await connection.execute(POST_MEMBER, [email, 'email']);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

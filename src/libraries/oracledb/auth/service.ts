import 'server-only';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import dayjs from '@/libraries/dayjs';
import CustomServerError from '@/libraries/error/customServerError';
import { ACCESS_TOKEN_EXPIRES_IN } from '@/libraries/oracledb/auth/config';
import { withOracleConnection } from '../connection';
import { GET_ONE_MEMBER, POST_MEMBER, UPDATE_MEMBER, UPDATE_VERIFICATION_CODE } from './sql';

export type MemberRow = [
  string, //email - pk
  string, //provider - 삭제예정
  'Y' | 'N', //disabled - 정지된 계정
  number, //userLv
  Date, //createAt - 가입일
  Date, //loginAt - 마지막 로그인 시간
  'Y' | 'N', //disconnect - 세션 끊기용
  string | null, //verificationCode - 인증코드 8자리
  Date, //expiresAt - 인증코드 만료시간
];

export type TMemberInfo = {
  email: string;
  provider: string;
  userLv: number;
  createAt: dayjs.Dayjs;
  loginAt: dayjs.Dayjs;
  verificationCode: string | null;
  expiresAt: dayjs.Dayjs;
};

export const getMemberByEmail = withOracleConnection(
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
      verificationCode: row[7],
      expiresAt: dayjs(row[8]),
    };
  },
);

/** 회원가입 겸 인증코드 발급 */
export const postMember = withOracleConnection(
  async (connection, { email }: { email: string }): Promise<string> => {
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
        // 가입되었을 때
      } else {
        // 가입되지 않은 회원이면 회원가입
        await connection.execute(POST_MEMBER, [email, 'email']);
      }

      const LENGTH = 8;

      /** 8자리 숫자를 랜덤으로 생성 */
      const verificationCode = Math.floor(Math.random() * 10 ** LENGTH)
        .toString()
        .padStart(LENGTH, '0');

      await connection.execute(UPDATE_VERIFICATION_CODE, [
        verificationCode,
        dayjs().add(10, 'minute').toDate(),
        email,
      ]);

      await connection.commit();

      return verificationCode;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

export const updateMemberLoginAt = withOracleConnection(
  async (connection, { email }: { email: string }): Promise<void> => {
    try {
      await connection.execute(UPDATE_MEMBER, [email]);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },
);

export const generateAccessToken = (arg: { email: string }): TSession => {
  const accessToken = jwt.sign({ email: arg.email }, process.env.ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  const now = dayjs();
  const expiresAt = now.add(ACCESS_TOKEN_EXPIRES_IN, 'second');

  return {
    accessToken,
    expiresAt: expiresAt.toDate(),
    email: arg.email,
  };
};

export const parseAccessToken = async () => {
  const headerList = await headers();
  const idToken = headerList.get('Authorization')?.split('Bearer ')[1];
  if (!idToken) return null;

  try {
    const decoded = jwt.verify(idToken, process.env.ACCESS_SECRET) as { email: string };
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new CustomServerError({ statusCode: 401, message: '세션이 만료되었습니다.' });
    }
    throw error;
  }
};

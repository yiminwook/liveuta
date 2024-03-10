'use server';
import OracleDB from 'oracledb';
import { connectOracleDB } from '../connection';
import { GET_MEMBER, POST_MEMBER, UPDATE_MEMBER } from './sql';
import dayjs from '@/model/dayjs';

export type MemberRow = [number, string, string, 'Y' | 'N', number, Date, Date, 'Y' | 'N'];

export type UserInfo = {
  id: number;
  email: string;
  provider: string;
  lv: number;
  createAt: dayjs.Dayjs;
  loginAt: dayjs.Dayjs;
};

export async function getUserInfo({
  email,
  provider,
}: {
  email: string;
  provider: string;
}): Promise<UserInfo> {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();
    const getresult = await connection.execute<MemberRow>(GET_MEMBER, [email, provider]);
    const row = getresult.rows?.[0];

    if (!row) throw new Error('회원 정보가 없습니다.');
    if (row[3] === 'Y') throw new Error('정지된 유저입니다.');
    if (row[7] === 'Y') throw new Error('DB 로그아웃');

    connection.close();
    return {
      id: row[0],
      email: row[1],
      provider: row[2],
      lv: row[4],
      createAt: dayjs(row[5]),
      loginAt: dayjs(row[6]),
    };
  } catch (error) {
    console.error('GetUserInfo Service Error');
    if (connection) {
      await connection.rollback();
      await connection.close();
    }
    throw error;
  }
}

export async function login({ email, provider }: { email: string; provider: string }) {
  let connection: OracleDB.Connection | null = null;
  try {
    connection = await connectOracleDB();
    const getresult = await connection.execute<MemberRow>(GET_MEMBER, [email, provider]);
    const row = getresult.rows?.[0];

    const isDisabled = row?.[3] === 'Y';
    if (isDisabled) throw new Error('정지된 유저입니다.');

    if (row) {
      // 이미 가입된 회원이면 로그인 시간을 업데이트
      const updateResult = await connection.execute(UPDATE_MEMBER, [email, provider]);
    } else {
      // 가입되지 않은 회원이면 회원가입
      const postResult = await connection.execute(POST_MEMBER, [email, provider]);
    }

    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error('Login Service Error');
    if (connection) {
      await connection.rollback();
      await connection.close();
    }
    throw error;
  }
}

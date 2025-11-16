import { NextResponse } from 'next/server';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { parseAccessToken } from '@/libraries/oracledb/auth/service';
import { getAllBlackList } from '@/libraries/oracledb/blacklist/service';

export async function GET() {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await getAllBlackList({
      memberEmail: payload.email,
    });

    return NextResponse.json({ message: '블랙리스트를 조회했습니다.', data });
  } catch (error) {
    console.error('GET /api/v1/blacklist', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

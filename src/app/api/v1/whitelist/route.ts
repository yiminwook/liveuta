import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { getAllWhiteList } from '@/libraries/oracleDB/whitelist/service';
import parseAccessToken from '@/utils/parseAccessToken';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await getAllWhiteList({
      memberId: payload.userId,
    });

    return NextResponse.json({ message: '화이트리스트를 조회했습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

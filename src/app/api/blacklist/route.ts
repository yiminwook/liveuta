import CustomServerError from '@/model/error/customServerError';
import errorHandler from '@/model/error/handler';
import { getAllBlackList } from '@/model/oracleDB/blacklist/service';
import parseAccessToken from '@api/_lib/parseAccessToken';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await getAllBlackList({
      memberId: payload.id,
    });

    return NextResponse.json({ message: '블랙리스트를 조회했습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

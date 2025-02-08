import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { getMember } from '@/libraries/oracleDB/auth/service';
import parseAccessToken from '@/utils/parseAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await getMember({
      email: payload.email,
      provider: payload.provider,
    });

    return NextResponse.json({ data });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

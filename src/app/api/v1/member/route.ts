import { NextRequest, NextResponse } from 'next/server';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import {
  generateAccessToken,
  getMemberByEmail,
  parseAccessToken,
} from '@/libraries/oracledb/auth/service';

export async function GET(req: NextRequest) {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    if (!payload.email) {
      console.error('email is not provided');
      throw new CustomServerError({ statusCode: 401, message: '이메일이 없습니다.' });
    }

    const userData = await getMemberByEmail({ email: payload.email });
    const session = generateAccessToken({ email: payload.email });

    return NextResponse.json({ data: { ...userData, ...session } });
  } catch (error) {
    console.error('GET /api/v1/member', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

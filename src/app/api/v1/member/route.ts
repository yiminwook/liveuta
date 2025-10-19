import { NextRequest, NextResponse } from 'next/server';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { getMember } from '@/libraries/oracledb/auth/service';
import parseIdToken from '@/utils/parse-id-token';

export async function GET(req: NextRequest) {
  try {
    const payload = await parseIdToken();

    if (!payload) {
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    if (!payload.email) {
      console.error('email is not provided');
      throw new CustomServerError({ statusCode: 401, message: '이메일이 없습니다.' });
    }

    const data = await getMember({ email: payload.email });

    return NextResponse.json({ data });
  } catch (error) {
    console.error('GET /api/v1/member', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

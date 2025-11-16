import { NextRequest, NextResponse } from 'next/server';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { getMemberByEmail, parseAccessToken } from '@/libraries/oracledb/auth/service';
import { getAllPulbicMetadata, updateMetadataValue } from '@/libraries/oracledb/metadata/service';
import { updateMetadataDto } from '@/types/dto';

export async function GET() {
  try {
    const metadata = await getAllPulbicMetadata();
    return NextResponse.json({ message: '메타데이터를 조회했습니다.', data: metadata });
  } catch (error) {
    console.error('GET /api/v1/metadata', error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const userInfo = await getMemberByEmail({ email: payload.email });

    if (userInfo.userLv < 3) {
      console.error('user level is not enough', userInfo.userLv);
      throw new CustomServerError({ statusCode: 403, message: '접근권한이 없습니다.' });
    }

    const body = await req.json();
    const dto = updateMetadataDto.parse(body);

    await updateMetadataValue(dto);

    return NextResponse.json({ message: '메타데이터를 업데이트했습니다.' });
  } catch (error) {
    console.error('PATCH /api/v1/metadata', error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

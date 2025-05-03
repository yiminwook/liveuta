import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { getAccessToken } from '@/libraries/firebase/admin';
import { getAllMetadata, updateMetadataValue } from '@/libraries/oracledb/metadata/service';
import { UpdateMetadataDto } from '@/types/dto';
import parseAccessToken from '@/utils/parse-access-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const metadata = await getAllMetadata();
    return NextResponse.json({ message: '메타데이터를 조회했습니다.', data: metadata });
  } catch (error) {
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await parseAccessToken();
    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    if (payload.userLv < 3) {
      throw new CustomServerError({ statusCode: 401, message: '접근권한이 없습니다.' });
    }

    const body = await req.json();
    const dto = UpdateMetadataDto.parse(body);

    await updateMetadataValue(dto);

    return NextResponse.json({ message: '메타데이터를 업데이트했습니다.' });
  } catch (error) {
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

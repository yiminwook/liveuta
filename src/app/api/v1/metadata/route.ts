import errorHandler from '@/libraries/error/handler';
import { getAllMetadata } from '@/libraries/oracleDB/metadata/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const metadata = await getAllMetadata();
    return NextResponse.json({ message: '메타데이터를 조회했습니다.', data: metadata });
  } catch (error) {
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

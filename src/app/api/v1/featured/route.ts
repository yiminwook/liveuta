import { MONGODB_FEATURED_COLLECTION, MONGODB_MANAGEMENT_DB } from '@/constants';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { connectMongoDB } from '@/libraries/mongoDB';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_FEATURED_COLLECTION);

    const scheduleDataRaw = await db.findOne(
      {},
      { projection: { _id: 0 }, sort: { last_updated: -1 } },
    );

    if (!scheduleDataRaw) {
      throw new CustomServerError({ statusCode: 404, message: '문서를 찾을 수 없습니다.' });
    }

    return NextResponse.json({
      message: '특집 데이터가 조회되었습니다.',
      data: { scheduleDataRaw },
    });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

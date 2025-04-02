import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/constants';
import dayjs from '@/libraries/dayjs';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { connectMongoDB } from '@/libraries/mongoDB';
import { TContentDocument } from '@/types/api/mongoDB';
import { parseAllData, parseScheduledData } from '@/utils/parseMongoDBData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_SCHEDULE_COLLECTION);

    const scheduleDataRaw = await db
      .find<Omit<TContentDocument, '_id'>>({}, { projection: { _id: 0 } })
      .sort({ ScheduledTime: 1, ChannelName: 1 })
      .toArray();

    if (!scheduleDataRaw) {
      throw new CustomServerError({ statusCode: 404, message: '문서를 찾을 수 없습니다.' });
    }

    const scheduleData = scheduleDataRaw.map((doc) => ({
      ...doc,
      ScheduledTime: dayjs(doc.ScheduledTime),
    }));

    const { scheduled, live } = parseScheduledData(scheduleData); // Need to be revised
    const { daily, all } = parseAllData(scheduleData); // Need to be revised

    return NextResponse.json({
      message: '스케줄이 조회되었습니다.',
      data: { scheduled, live, daily, all },
    });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

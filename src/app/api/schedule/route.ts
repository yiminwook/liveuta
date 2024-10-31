import { parseAllData, parseScheduledData, parseFeatured } from '@/utils/parseMongoDBData';
import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/constants';
import dayjs from '@/libraries/dayjs';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { connectMongoDB } from '@/libraries/mongoDB';
import { ContentDocumentRaw } from '@/types/api/mongoDB';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_SCHEDULE_COLLECTION);

    const scheduleDataRaw = await db
      .find<ContentDocumentRaw>({})
      .sort({ ScheduledTime: 1, ChannelName: 1 })
      .toArray();

    if (!scheduleDataRaw) {
      throw new CustomServerError({ statusCode: 404, message: '문서를 찾을 수 없습니다.' });
    }

    const scheduleData = scheduleDataRaw.map((doc) => ({
      ...doc,
      ScheduledTime: dayjs.tz(doc.ScheduledTime),
    }));

    const { scheduled, live } = parseScheduledData(scheduleData); // Need to be revised
    const { daily, all } = parseAllData(scheduleData); // Need to be revised
    const { featured } = parseFeatured(scheduleData);

    return NextResponse.json({
      message: '스케쥴이 조회되었습니다.',
      data: { scheduled, live, daily, all, featured },
    });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

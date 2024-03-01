import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/model/error/handler';
import { parseAllData, parseScheduledData } from '@/app/api/_lib/parseMongoDBData';
import { ScheduleAPIReturntype, ContentDocumentRaw } from '@/type/api/mongoDB';
import dayjs from '@/model/dayjs';
import { connectMongoDB, disconnectMongoDB } from '@/model/mongoDB';
import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/const';
import CustomServerError from '@/model/error/customServerError';

export async function GET(_req: NextRequest) {
  try {
    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_SCHEDULE_COLLECTION);

    const scheduleDataRaw = await db
      .find<ContentDocumentRaw>({})
      .sort({ ScheduledTime: 1, ChannelName: 1 })
      .toArray();

    if (!scheduleDataRaw) {
      throw new CustomServerError({ statusCode: 404, message: '문서를 찾을 수 없습니다.' });
    }

    await disconnectMongoDB();

    const scheduleData = scheduleDataRaw.map((doc) => ({
      ...doc,
      ScheduledTime: dayjs.tz(doc.ScheduledTime),
    }));

    const { scheduled, live } = parseScheduledData(scheduleData); // Need to be revised
    const { daily, all } = parseAllData(scheduleData); // Need to be revised

    return NextResponse.json<ScheduleAPIReturntype>(
      { scheduled, live, daily, all },
      { status: 200 },
    );
  } catch (error) {
    console.error('GET: /schedule', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export const dynamic = 'force-dynamic';

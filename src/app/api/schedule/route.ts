import { parseAllData, parseScheduledData } from '@/app/api/_lib/parseMongoDBData';
import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/const';
import dayjs from '@/model/dayjs';
import CustomServerError from '@/model/error/customServerError';
import { connectMongoDB } from '@/model/mongoDB';
import { ContentDocumentRaw, ContentsDataReturnType } from '@/type/api/mongoDB';
import errorHandler from '@/model/error/handler';
import { NextResponse } from 'next/server';

export type GetScheduleRes = {
  message: string;
  data: {
    scheduled: ContentsDataReturnType;
    live: ContentsDataReturnType;
    daily: ContentsDataReturnType;
    all: ContentsDataReturnType;
  };
};

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

    return NextResponse.json(
      { message: '스케쥴이 조회되었습니다.', data: { scheduled, live, daily, all } },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message: message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

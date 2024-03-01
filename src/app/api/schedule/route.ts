import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import errorHandler from '@/model/error/handler';
import { parseAllData, parseScheduledData } from '@/app/api/_lib/parseMongoDBData';
import { MongoDBAPIReturntype, ContentDocumentRaw } from '@/type/api/mongoDB';
import dayjs from '@/model/dayjs';
import { connectMongoDB, disconnectMongoDB } from '@/model/mongoDB';
import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/const';
import checkRequestUrl from '@api/_lib/checkRequestUrl';

export async function GET(_req: NextRequest) {
  try {
    checkRequestUrl();
    const cookieStore = cookies();
    const cookie = cookieStore.get('select')?.value || 'all';

    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_SCHEDULE_COLLECTION);

    const scheduleDataRaw = await db
      .find<ContentDocumentRaw>({})
      .sort({ ScheduledTime: 1, ChannelName: 1 })
      .toArray();

    if (!scheduleDataRaw) throw new Error('documents is undefined.');

    const scheduleData = scheduleDataRaw.map((doc) => ({
      ...doc,
      ScheduledTime: dayjs.tz(doc.ScheduledTime),
    }));

    const { scheduled, live } = parseScheduledData(scheduleData); // Need to be revised
    const { daily, all } = parseAllData(scheduleData); // Need to be revised

    // Not sure, but maybe need to be revised
    switch (cookie) {
      case 'video':
        scheduled.contents = scheduled.contents.filter((item) => item.isVideo === true);
        live.contents = live.contents.filter((item) => item.isVideo === true);
        daily.contents = daily.contents.filter((item) => item.isVideo === true);
        all.contents = all.contents.filter((item) => item.isVideo === true);
        break;
      case 'stream':
        scheduled.contents = scheduled.contents.filter((item) => item.isVideo !== true);
        live.contents = live.contents.filter((item) => item.isVideo !== true);
        daily.contents = daily.contents.filter((item) => item.isVideo !== true);
        all.contents = all.contents.filter((item) => item.isVideo !== true);
        break;

      default:
        break;
    }

    disconnectMongoDB();
    return NextResponse.json<MongoDBAPIReturntype | undefined>(
      { scheduled, live, daily, all },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export const dynamic = 'force-dynamic';

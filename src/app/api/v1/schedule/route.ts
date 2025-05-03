import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/constants';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { connectMongoDB } from '@/libraries/mongoDB';
import { TContentDocument, TParsedServerContent } from '@/types/api/mongoDB';
import { TGetScheduleResponse } from '@/types/api/schedule';
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

    const parseScheduledData = scheduleDataRaw.map<TParsedServerContent>((raw) => ({
      title: raw.Title,
      videoId: raw.VideoId,
      channelId: raw.ChannelId,
      utcTime: raw.ScheduledTime,
      broadcastStatus: raw.broadcastStatus,
      isHide: raw.Hide === 'TRUE' ? true : false,
      isVideo: raw.isVideo === 'TRUE' ? true : false,
      viewer: raw.concurrentViewers,
      tag: raw.tag || '',
    }));

    return NextResponse.json<TGetScheduleResponse>({
      message: '스케줄이 조회되었습니다.',
      data: parseScheduledData,
    });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

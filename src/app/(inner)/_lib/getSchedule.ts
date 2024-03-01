'use server';
import { parseAllData, parseScheduledData } from '@/app/api/_lib/parseMongoDBData';
import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/const';
import dayjs from '@/model/dayjs';
import CustomServerError from '@/model/error/customServerError';
import { connectMongoDB, disconnectMongoDB } from '@/model/mongoDB';
import { ContentDocumentRaw } from '@/type/api/mongoDB';

export default async function getSchedule() {
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

    return { scheduled, live, daily, all };
  } catch (error) {
    console.error('Schedule ServerAction', error);
    throw error;
  }
}

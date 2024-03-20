'use server';
import { parseAllData, parseScheduledData } from '@/app/api/_lib/parseMongoDBData';
import { MONGODB_SCHEDULE_COLLECTION, MONGODB_SCHEDULE_DB } from '@/const';
import dayjs from '@/model/dayjs';
import CustomServerError from '@/model/error/customServerError';
import { connectMongoDB, disconnectMongoDB } from '@/model/mongoDB';
import { ContentDocumentRaw } from '@/type/api/mongoDB';
import errorHandler from '@/model/error/handler';
import { getAllBlackList } from '@/model/oracleDB/blacklist/service';
import parseAccessToken from '@inner/_lib/parseAccessToken';

export async function getAllSchedule({ accessToken }: { accessToken?: string }) {
  try {
    let blackList = new Set<string>();

    if (accessToken) {
      const payload = await parseAccessToken(accessToken);
      await getAllBlackList({ memberId: payload.id }).then((list) => {
        blackList = new Set(list);
      });
    }

    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_SCHEDULE_COLLECTION);

    const scheduleDataRaw = await db
      .find<ContentDocumentRaw>({})
      .sort({ ScheduledTime: 1, ChannelName: 1 })
      .toArray();

    if (!scheduleDataRaw) {
      throw new CustomServerError({ statusCode: 404, message: '문서를 찾을 수 없습니다.' });
    }

    await disconnectMongoDB();

    const scheduleData = scheduleDataRaw
      .map((doc) => ({
        ...doc,
        ScheduledTime: dayjs.tz(doc.ScheduledTime),
      }))
      .filter((doc) => !blackList.has(doc.ChannelId)); // 블랙리스트 필터링

    const { scheduled, live } = parseScheduledData(scheduleData); // Need to be revised
    const { daily, all } = parseAllData(scheduleData); // Need to be revised

    const result = { scheduled, live, daily, all };
    return { status: 200, message: '스케쥴이 조회되었습니다.', result };
  } catch (error) {
    console.error('getAllSchedule ServerAction', error);
    const { status, message } = errorHandler(error);
    throw { status, message, result: null };
  }
}

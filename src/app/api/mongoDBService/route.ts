import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import errorHandler from '@/model/error/handler';
import { deleteDB, readDB, writeDB } from '@/model/mongoDBService';
import { parseAllData, parseScheduledData } from '@/app/api/_lib/parseMongoDBData';
import { MongoDBAPIReturntype, ContentDocumentRaw } from '@/type/api/mongoDB';
import { PushData } from '@/app/api/push/route';
import dayjs from '@/model/dayjs';

export async function GET(_req: NextRequest) {
  try {
    const cookieStore = cookies();
    const cookie = cookieStore.get('select')?.value || 'all';

    const collection = process.env.MONGODB_SCHEDULE_COLLECTION;
    const database = process.env.MONGODB_SCHEDULE_DB;

    const scheduleDataRaw: ContentDocumentRaw[] = await readDB(collection, database, {
      sort: { ScheduledTime: 1 },
    });
    if (!scheduleDataRaw) throw new Error('documents is undefined.');

    const scheduleData = scheduleDataRaw.map((doc) => ({
      ...doc,
      ScheduledTime: dayjs(doc.ScheduledTime),
    }));
    // .sort((a, b) => (a.ScheduledTime.isBefore(b.ScheduledTime) ? -1 : 1));

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

    // Need to revise SheetAPIReturntype
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

export async function POST(req: NextRequest) {
  try {
    const requestBody: PushData = await req.json();

    const notiCollection = process.env.MONGODB_NOTI_COLLECTION;
    const notiDatabase = process.env.MONGODB_SCHEDULE_DB;

    const existingData = await readDB(notiCollection, notiDatabase, {
      filter: { token: requestBody.token, link: requestBody.link },
    });

    if (existingData && existingData.length !== 0) {
      return NextResponse.json({ message: '이미 등록된 알림입니다.' }, { status: 226 });
    }

    await writeDB(notiCollection, notiDatabase, { document: requestBody });

    return NextResponse.json({ message: '알림이 성공적으로 등록되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const requestBody: PushData = await req.json();

    const notiCollection = process.env.MONGODB_NOTI_COLLECTION;
    const notiDatabase = process.env.MONGODB_SCHEDULE_DB;

    const existingData: any[] = await readDB(notiCollection, notiDatabase, {
      filter: { token: requestBody.token, link: requestBody.link },
    });

    if (existingData && existingData.length !== 0) {
      return NextResponse.json({ message: '이미 취소된 알림입니다.' }, { status: 226 });
    }

    await deleteDB(notiCollection, notiDatabase, {
      filter: { token: requestBody.token, link: requestBody.link },
    });

    return NextResponse.json({ message: '알림이 성공적으로 취소되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}

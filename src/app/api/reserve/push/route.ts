import { NextRequest, NextResponse } from 'next/server';
import { PushData } from '@/app/api/push/route';
import { deleteDB, readDB, writeDB } from '@/model/mongoDBService';
import errorHandler from '@/model/error/handler';

export async function POST(req: NextRequest) {
  try {
    const requestBody: PushData = await req.json();

    const notiCollection = process.env.MONGODB_NOTI_COLLECTION;
    const notiDatabase = process.env.MONGODB_SCHEDULE_DB;

    const readResult = await readDB(notiCollection, notiDatabase, {
      filter: { token: requestBody.token, link: requestBody.link },
    });

    if (readResult && readResult.length !== 0) {
      const deleteResult = await deleteDB(notiCollection, notiDatabase, readResult[0]);
      return NextResponse.json({ message: '알림이 취소되었습니다.' }, { status: 200 });
    }

    const createResult = await writeDB(notiCollection, notiDatabase, { document: requestBody });
    return NextResponse.json({ message: '알림이 예약되었습니다.' }, { status: 201 });
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

    return NextResponse.json({ message: '알림이 성공적으로 취소되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}

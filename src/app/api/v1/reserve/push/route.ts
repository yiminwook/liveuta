import { PushData } from '@/app/api/push/route';
import { MONGODB_NOTI_COLLECTION, MONGODB_SCHEDULE_DB } from '@/constants';
import errorHandler from '@/libraries/error/handler';
import { connectMongoDB } from '@/libraries/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const requestBody: PushData = await req.json();

    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_NOTI_COLLECTION);

    const readResult = await db.findOne({
      token: requestBody.token,
      link: requestBody.link,
    });

    if (readResult) {
      await db.deleteOne(readResult);
      return NextResponse.json({ message: '알림이 취소되었습니다.', data: null });
    }

    await db.insertOne(requestBody);
    return NextResponse.json({ message: '알림이 예약되었습니다.', data: null }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

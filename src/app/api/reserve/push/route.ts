import { NextRequest, NextResponse } from 'next/server';
import { PushData } from '@/app/api/push/route';
import { connectMongoDB, disconnectMongoDB } from '@/model/mongoDB';
import errorHandler from '@/model/error/handler';
import { MONGODB_NOTI_COLLECTION, MONGODB_SCHEDULE_DB } from '@/const';

export async function POST(req: NextRequest) {
  try {
    const requestBody: PushData = await req.json();

    const db = await connectMongoDB(MONGODB_SCHEDULE_DB, MONGODB_NOTI_COLLECTION);

    const readResult = await db.findOne({
      token: requestBody.token,
      link: requestBody.link,
    });

    if (readResult) {
      const deleteResult = await db.deleteOne(readResult);
      disconnectMongoDB();
      return NextResponse.json({ message: '알림이 취소되었습니다.' }, { status: 200 });
    }

    const createResult = await db.insertOne(requestBody);
    disconnectMongoDB();
    return NextResponse.json({ message: '알림이 예약되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}

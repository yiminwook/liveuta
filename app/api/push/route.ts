import { NextRequest, NextResponse } from 'next/server';
import { getMessaging, Message } from 'firebase-admin/messaging';
import FirebaseAdmin from '@/models/firebase/admin';
import errorHandler from '@/models/error/handler';
import dayjs from '@/models/dayjs';

export interface PushData {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
  link: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const resquestBody: PushData[] = await request.json();

    const messages = resquestBody.map<Message>((data) => ({
      token: data.token,
      notification: {
        title: data.title,
        body: data.body,
        imageUrl: data.imageUrl,
      },
      webpush: {
        headers: {
          TTL: '1800', // 30분후 만료
        },
        fcmOptions: {
          link: data.link,
        },
        notification: {
          title: data.title,
          body: data.body,
          imageUrl: data.imageUrl,
          timestamp: Number(data.timestamp) || dayjs().unix(),
          // click_action: data.imageUrl,
        },
      },
      data: {
        TTL: '1800', // 30분후 만료
        link: data.link,
        timestamp: data.timestamp,
      },
    }));
    console.log(messages[0]);
    FirebaseAdmin.getInstance();

    const response = await getMessaging().sendAll(messages);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
}

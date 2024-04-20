import { NextRequest, NextResponse } from 'next/server';
import { getMessaging, Message } from 'firebase-admin/messaging';
import FirebaseAdmin from '@/model/firebase/admin';
import errorHandler from '@/model/error/handler';

export interface PushData {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
  link: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const resquestBody: PushData[] = await req.json();

    const messages = resquestBody.map<Message>((data) => ({
      token: data.token,
      webpush: {
        headers: {
          TTL: '1800', // 30분후 만료
        },
      },
      data: {
        TTL: '1800', // 30분후 만료
        link: data.link,
        title: data.title,
        body: data.body,
        imageUrl: data.imageUrl,
        timestamp: data.timestamp,
      },
    }));

    console.log('push FCM!!', messages.length);

    FirebaseAdmin.getInstance();

    const response = await getMessaging().sendAll(messages);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

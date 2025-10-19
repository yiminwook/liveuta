import { PushData } from '@api/push/route';
import { getMessaging } from 'firebase-admin/messaging';
import { NextRequest, NextResponse } from 'next/server';
import dayjs from '@/libraries/dayjs';
import errorHandler from '@/libraries/error/handler';
import FirebaseAdmin from '@/libraries/firebase/admin';

export const POST = async (request: NextRequest) => {
  try {
    const resquestBody: PushData = await request.json();

    FirebaseAdmin.getInstance();

    const response = await getMessaging().send({
      token: resquestBody.token,
      notification: {
        title: resquestBody.title,
        body: resquestBody.body,
        imageUrl: resquestBody.imageUrl,
      },
      webpush: {
        headers: {
          TTL: '1800', // 30분후 만료
        },
        fcmOptions: {
          link: resquestBody.link,
        },
        notification: {
          timestamp: Number(resquestBody.timestamp) || dayjs.unix(),
          title: resquestBody.title,
          body: resquestBody.body,
          imageUrl: resquestBody.imageUrl,
          click_action: resquestBody.link,
        },
        data: {
          TTL: '1800', // 30분후 만료
          timestamp: resquestBody.timestamp?.toString() || '0',
          link: resquestBody.link || 'https://liveuta.vercel.app',
        },
      },
    });

    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
};

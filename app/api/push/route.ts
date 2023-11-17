import { NextRequest, NextResponse } from 'next/server';
import { getMessaging } from 'firebase-admin/messaging';
import FirebaseAdmin from '@/models/firebase/admin';

interface requestBody {
  tokens: string[];
  title: string;
  body: string;
  imageUrl?: string;
  link?: string;
}

export async function POST(request: NextRequest) {
  try {
    const resquestBody: requestBody = await request.json();

    for (const _key in resquestBody) {
      const key = _key as keyof requestBody;

      if (key === 'tokens' && Array.isArray(resquestBody[key]) === false) {
        throw new Error('tokens is not array');
      }

      if (key !== 'tokens' && typeof resquestBody[key] !== 'string') {
        throw new Error(`${key} parameter is not string`);
      }
    }

    FirebaseAdmin.getInstance();

    const response = await getMessaging().sendMulticast({
      tokens: resquestBody.tokens,
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
      },
    });

    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ data: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getMessaging } from 'firebase-admin/messaging';
import FirebaseAdmin from '@/models/firebase/admin';

interface requestBody {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: requestBody = await request.json();

    FirebaseAdmin.getInstance();

    const response = await getMessaging().send({
      token: body.token,
      notification: {
        title: body.title,
        body: body.body,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ data: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { getAccessToken } from '@/model/firebase/admin';

interface requestBody {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const requestBody: requestBody = await request.json();

    const token = await getAccessToken();

    const body = {
      message: {
        token: requestBody.token,
        notification: {
          title: requestBody.title,
          body: requestBody.body,
          image: requestBody.imageUrl,
        },
      },
    };

    const res = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      url: `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID!}/messages:send`,
      data: body,
    });

    const data: { name: string } = res.data;

    return NextResponse.json({ data: data.name }, { status: 201 });
  } catch (error) {
    let err = error as Error;

    if (err instanceof AxiosError) {
      const data = err.response?.data.error;

      if (data) {
        err = data;
      }
    }

    const message = err?.message || 'Unknown error';
    return NextResponse.json({ data: message }, { status: 500 });
  }
}

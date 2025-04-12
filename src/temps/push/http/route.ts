// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const SERVER_KEY =
  'AAAAUFvjs18:APA91bEcu-aTdRkLTU_N9-82Ngde0XaRqk52uzmIi33slW0y0HdI1zLK_1rIWG0mg9UD4GVbz9B-QdXiMzFQXIeYWvNeiZCY1xklltD-Sz773KwZZhVMzmmBo8bndwjwnMrOkCWxN8-G';

interface requestBody {
  token: string;
  title: string;
  body: string;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const requestBody: requestBody = await request.json();

    const body = {
      to: requestBody.token,
      notification: {
        title: requestBody.title,
        body: requestBody.body,
        image: requestBody.imageUrl,
        click_action: 'ACTIVITY',
      },
    };

    const res = await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${SERVER_KEY}`,
      },
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      data: body,
    });

    return NextResponse.json({ data: res.data }, { status: 201 });
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

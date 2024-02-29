import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import CustomServerError from '@/model/error/customServerError';
import { Payload } from '@/type/nextAuth';
import errorHandler from '@/model/error/handler';
import { postSetlist } from '@/model/oracleDB/setlist/service';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) throw new CustomServerError({ statusCode: 401, message: 'Unauthorized' });
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET) as Payload;
    console.log('payload', payload);

    const body: {
      videoId: string;
      description: string;
    } = await request.json();

    console.log(body);
    await postSetlist(body.videoId, body.description, payload.id);

    return NextResponse.json({ status: 201, message: 'ok' });
  } catch (error) {
    console.error('POST: /setlist', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ status, message });
  }
}

export const dynamic = 'force-dynamic';

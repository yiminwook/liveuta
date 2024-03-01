import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import CustomServerError from '@/model/error/customServerError';
import { Payload } from '@/type/nextAuth';
import errorHandler from '@/model/error/handler';
import { getYoutubeChannelsByVideoId } from '@/model/youtube';
import { postSetlist } from '@/model/oracleDB/setlist/service';

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) throw new CustomServerError({ statusCode: 401, message: 'Unauthorized' });
    const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET) as Payload;

    const body: {
      videoId: string;
      description: string;
    } = await request.json();

    const item = await getYoutubeChannelsByVideoId(body.videoId);
    const channelId = item?.snippet?.channelId;
    const broadcastAt = item?.snippet?.publishedAt;

    if (!channelId) {
      throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
    }

    await postSetlist(body.videoId, body.description, payload.id, channelId, broadcastAt);

    return NextResponse.json({ status: 201, message: 'ok' });
  } catch (error) {
    console.error('POST: /setlist', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = 'force-dynamic';

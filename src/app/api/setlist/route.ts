import { NextRequest, NextResponse } from 'next/server';
import CustomServerError from '@/model/error/customServerError';
import errorHandler from '@/model/error/handler';
import { getYoutubeChannelsByVideoId } from '@/model/youtube';
import { postSetlist } from '@/model/oracleDB/setlist/service';
import parseAccessToken from '@api/_lib/parseAccessToken';

export async function POST(request: NextRequest) {
  try {
    const payload = await parseAccessToken();
    const body: {
      videoId: string;
      description: string;
    } = await request.json();

    const item = await getYoutubeChannelsByVideoId(body.videoId);
    const channelId = item?.snippet?.channelId;
    const broadcastAt = item?.snippet?.publishedAt;
    const title = item?.snippet?.title;

    if (!channelId || !title) {
      throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
    }

    await postSetlist(body.videoId, body.description, payload.id, channelId, broadcastAt, title);

    return NextResponse.json({ status: 201, message: 'ok' });
  } catch (error) {
    console.error('POST: /setlist', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = 'force-dynamic';

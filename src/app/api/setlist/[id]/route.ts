import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/model/error/handler';
import { updateSetlist } from '@/model/oracleDB/setlist/service';
import checkRequestUrl from '@api/_lib/checkRequestUrl';
import parseAccessToken from '@api/_lib/parseAccessToken';
import { getYoutubeChannelsByVideoId } from '@/model/youtube';
import CustomServerError from '@/model/error/customServerError';

type PostParams = {
  params: { id: string };
};
export async function POST(request: NextRequest, { params }: PostParams) {
  try {
    await checkRequestUrl();
    const payload = await parseAccessToken();
    const body: {
      description: string;
    } = await request.json();

    const item = await getYoutubeChannelsByVideoId(params.id);
    const channelId = item?.snippet?.channelId;
    const broadcastAt = item?.snippet?.publishedAt;
    const title = item?.snippet?.title;

    if (!channelId || !title) {
      throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
    }

    await updateSetlist(params.id, body.description, payload.id, channelId, broadcastAt, title);

    return NextResponse.json({ status: 200, message: 'ok' });
  } catch (error) {
    console.error('POST: /setlist/[id]', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = 'force-dynamic';

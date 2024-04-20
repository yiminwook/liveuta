import CustomServerError from '@/model/error/customServerError';
import errorHandler from '@/model/error/handler';
import { deleteSetlist, postSetlist, updateSetlist } from '@/model/oracleDB/setlist/service';
import parseAccessToken from '@api/_lib/parseAccessToken';
import { NextRequest, NextResponse } from 'next/server';
import { SETLIST_DELETE_LEVEL } from './type';
import { checkDescription } from './validation';
import { getYoutubeChannelsByVideoId } from '@/model/youtube';

export async function POST(req: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const body = await req.json();
    const description = checkDescription(body);

    const item = await getYoutubeChannelsByVideoId(params.videoId);
    const channelId = item?.snippet?.channelId;
    const broadcastAt = item?.snippet?.publishedAt;
    const title = item?.snippet?.title;

    if (!channelId || !title) {
      throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
    }

    await postSetlist(params.videoId, description, payload.id, channelId, broadcastAt, title);
    return NextResponse.json({ message: '등록되었습니다.', data: null }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const body = await req.json();
    const description = checkDescription(body);

    const item = await getYoutubeChannelsByVideoId(params.videoId);
    const channelId = item?.snippet?.channelId;
    const broadcastAt = item?.snippet?.publishedAt;
    const title = item?.snippet?.title;

    if (!channelId || !title) {
      throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
    }

    await updateSetlist(params.videoId, description, payload.id, channelId, broadcastAt, title);
    return NextResponse.json({ message: '수정되었습니다.', data: null });
  } catch (error) {
    console.error(error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const payload = await parseAccessToken();
    if (!payload || payload.userLv < SETLIST_DELETE_LEVEL) {
      throw new CustomServerError({ message: '권한이 없습니다.', statusCode: 401 });
    }
    await deleteSetlist(params.videoId);
    return NextResponse.json({ message: '삭제되었습니다.', data: null });
  } catch (error) {
    console.error(error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

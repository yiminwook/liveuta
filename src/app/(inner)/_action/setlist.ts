'use server';
import {
  getAllSetlist,
  postSetlist,
  searchSetlist,
  updateSetlist,
} from '@/model/oracleDB/setlist/service';
import parseAccessToken from '../_lib/parseAccessToken';
import { getYoutubeChannelsByVideoId } from '@/model/youtube';
import CustomServerError from '@/model/error/customServerError';

export async function GET(arg: {
  query: string;
  startRow: number;
  orderType: 'CREATE_AT' | 'BROADCAST_AT';
  accessToken: string | null;
  isFavorite: boolean;
}) {
  const payload = arg.accessToken ? await parseAccessToken(arg.accessToken) : { id: 0 };
  // Guest일경우 id를 0으로 설정
  const result = arg.query
    ? await searchSetlist({
        query: arg.query,
        startRow: arg.startRow,
        memberId: payload.id,
        orderType: arg.orderType,
        isFavorite: arg.isFavorite,
      })
    : await getAllSetlist({
        startRow: arg.startRow,
        memberId: payload.id,
        orderType: arg.orderType,
        isFavorite: arg.isFavorite,
      });

  return result;
}

export async function POST(arg: { videoId: string; description: string; accessToken: string }) {
  const payload = await parseAccessToken(arg.accessToken);

  const item = await getYoutubeChannelsByVideoId(arg.videoId);
  const channelId = item?.snippet?.channelId;
  const broadcastAt = item?.snippet?.publishedAt;
  const title = item?.snippet?.title;

  if (!channelId || !title) {
    throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
  }

  await postSetlist(arg.videoId, arg.description, payload.id, channelId, broadcastAt, title);
  return 'ok';
}

export async function UPDATE(arg: { accessToken: string; description: string; videoId: string }) {
  const payload = await parseAccessToken(arg.accessToken);
  const item = await getYoutubeChannelsByVideoId(arg.videoId);
  const channelId = item?.snippet?.channelId;
  const broadcastAt = item?.snippet?.publishedAt;
  const title = item?.snippet?.title;

  if (!channelId || !title) {
    throw new CustomServerError({ statusCode: 404, message: '채널을 찾을 수 없습니다.' });
  }

  await updateSetlist(arg.videoId, arg.description, payload.id, channelId, broadcastAt, title);
  return 'ok';
}

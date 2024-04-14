'use server';
import { postSetlist, updateSetlist } from '@/model/oracleDB/setlist/service';
import parseAccessToken from '../_lib/parseAccessToken';
import { getYoutubeChannelsByVideoId } from '@/model/youtube';
import CustomServerError from '@/model/error/customServerError';

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

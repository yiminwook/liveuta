'use server';
import parseAccessToken from '../_lib/parseAccessToken';
import { getAllBlackList, postBlacklist } from '@/model/oracleDB/blacklist/service';

export async function GET(arg: { accessToken: string }) {
  const payload = await parseAccessToken(arg.accessToken);
  const result = await getAllBlackList({
    memberId: payload.id,
  });
  return result;
}

export async function POST(arg: { accessToken: string; channelId: string }) {
  const payload = await parseAccessToken(arg.accessToken);
  const result = await postBlacklist({
    memberId: payload.id,
    channelId: arg.channelId,
  });
  return result;
}

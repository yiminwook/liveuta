'use server';
import errorHandler from '@/model/error/handler';
import parseAccessToken from '../_lib/parseAccessToken';
import {
  getAllWhiteList as GET,
  postWhitelist as POST,
  deleteWhitelist as DELETE,
} from '@/model/oracleDB/whitelist/service';

export async function getAllWhitelist(arg: { accessToken: string }) {
  try {
    const payload = await parseAccessToken(arg.accessToken);
    const result = await GET({
      memberId: payload.id,
    });
    return { status: 200, message: '화이트리스트를 조회했습니다.', result };
  } catch (error) {
    console.error('getAllWhitelist ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}

export async function postWhitelist(arg: { accessToken: string; channelId: string }) {
  try {
    const payload = await parseAccessToken(arg.accessToken);
    const result = await POST({
      memberId: payload.id,
      channelId: arg.channelId,
    });
    return { status: 201, message: '등록 되었습니다.', result };
  } catch (error) {
    console.error('postWhitelist ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}

export async function deleteWhitelist(arg: { accessToken: string; channelId: string }) {
  try {
    const payload = await parseAccessToken(arg.accessToken);
    const result = await DELETE({
      memberId: payload.id,
      channelId: arg.channelId,
    });
    return { status: 200, message: '등록이 해제되었습니다.', result };
  } catch (error) {
    console.error('deleteWhitelist ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}

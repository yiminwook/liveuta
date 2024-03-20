'use server';
import errorHandler from '@/model/error/handler';
import parseAccessToken from '../_lib/parseAccessToken';
import {
  getAllBlackList as GET,
  postBlacklist as POST,
  deleteBlacklist as DELETE,
} from '@/model/oracleDB/blacklist/service';

export async function getAllBlackList(arg: { accessToken: string }) {
  try {
    const payload = await parseAccessToken(arg.accessToken);
    const result = await GET({
      memberId: payload.id,
    });
    return { status: 200, message: '블랙리스트를 조회했습니다.', result };
  } catch (error) {
    console.error('getAllBlackList ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}

export async function postBlacklist(arg: { accessToken: string; channelId: string }) {
  try {
    const payload = await parseAccessToken(arg.accessToken);
    const result = await POST({
      memberId: payload.id,
      channelId: arg.channelId,
    });
    return { status: 201, message: '블록되었습니다.', result };
  } catch (error) {
    console.error('postBlacklist ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}

export async function deleteBlacklist(arg: { accessToken: string; channelId: string }) {
  try {
    const payload = await parseAccessToken(arg.accessToken);
    const result = await DELETE({
      memberId: payload.id,
      channelId: arg.channelId,
    });
    return { status: 200, message: '블록이 해제되었습니다.', result };
  } catch (error) {
    console.error('deleteBlacklist ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
}

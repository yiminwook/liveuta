'use server';
import errorHandler from '@/model/error/handler';
import { getAllChannel } from '@/model/mongoDB/getAllChannel';

export const getAllChannelList = async () => {
  try {
    const result = await getAllChannel();
    return { status: 200, message: '채널 목록을 조회했습니다.', result };
  } catch (error) {
    console.log('getAllChannelList ServerAction', error);
    const { status, message } = errorHandler(error);
    return { status, message, result: null };
  }
};

import errorHandler from '@/libraries/error/handler';
import { getWaitingList } from '@/libraries/mongodb/channels';
import type { WaitingListItem } from '@/libraries/mongodb/type';
import { NextResponse } from 'next/server';

export type TGetChannelRes = {
  message: string;
  data: WaitingListItem[];
};

export async function GET() {
  try {
    const data = await getWaitingList();
    return NextResponse.json({ message: '채널 목록을 조회했습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: [] }, { status });
  }
}

export const revalidate = 1800;

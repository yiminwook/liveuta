import errorHandler from '@/libraries/error/handler';
import { getAllChannel } from '@/libraries/mongoDB/getAllChannel';
import { ChannelData } from '@/types/api/mongoDB';
import { NextResponse } from 'next/server';

export type GetChannelRes = {
  message: string;
  data: ChannelData[];
};

export async function GET() {
  try {
    const data = await getAllChannel();
    return NextResponse.json({ message: '채널 목록을 조회했습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

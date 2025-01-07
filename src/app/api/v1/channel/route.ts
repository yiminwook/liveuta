import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import { CHANNEL_ORDER_MAP, channelDto, getAllChannel } from '@/libraries/mongoDB/channels';
import { TChannelData } from '@/types/api/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

export type TGetChannelRes = {
  message: string;
  data: TChannelData[];
};

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const order = searchParams.get('order') as keyof typeof CHANNEL_ORDER_MAP;

  try {
    const dto = channelDto.safeParse({ order });

    if (dto.error) {
      throw new BadReqError(dto.error.errors[0].message);
    }

    const data = await getAllChannel(dto.data);
    return NextResponse.json({ message: '채널 목록을 조회했습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const revalidate = 60;

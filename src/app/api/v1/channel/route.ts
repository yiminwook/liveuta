import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import { channelDto, getAllChannel } from '@/libraries/mongodb/channels';
import { TChannelDocumentWithoutId } from '@/libraries/mongodb/type';
import { NextRequest, NextResponse } from 'next/server';

export type TGetChannelRes = {
  message: string;
  data: TChannelDocumentWithoutId[];
};

export async function GET(req: NextRequest) {
  try {
    const dto = channelDto.safeParse({});

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

export const revalidate = 1800;

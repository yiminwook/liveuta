import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import { channelDto, getChannelWithYoutube } from '@/libraries/mongoDB/getAllChannel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const sort = searchParams.get('sort');
  const size = searchParams.get('size');
  const page = searchParams.get('page');
  const query = searchParams.get('query');

  try {
    const dto = channelDto.safeParse({ sort, size, page, query });

    if (dto.error) {
      throw new BadReqError(dto.error.errors[0].message);
    }

    const data = await getChannelWithYoutube(dto.data);
    return NextResponse.json({ message: '채널 목록을 조회했습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

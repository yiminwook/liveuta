import errorHandler from '@/libraries/error/handler';
import { getChannelWithYoutubeById } from '@/libraries/mongodb/channels';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, props: { params: Promise<{ channelId: string }> }) {
  try {
    const { channelId } = await props.params;

    const channel = await getChannelWithYoutubeById(channelId);

    return NextResponse.json({
      message: '채널을 조회했습니다.',
      data: channel,
    });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

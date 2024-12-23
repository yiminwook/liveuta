import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { deleteWhitelist, postWhitelist } from '@/libraries/oracleDB/whitelist/service';
import parseAccessToken from '@/utils/parseAccessToken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  _req: NextRequest,
  props: {
    params: Promise<{ channelId: string }>;
  },
) {
  const params = await props.params;
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await postWhitelist({
      memberId: payload.userId,
      channelId: params.channelId,
    });

    return NextResponse.json({ message: '등록되었습니다.', data }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export async function DELETE(
  _req: NextRequest,
  props: {
    params: Promise<{ channelId: string }>;
  },
) {
  const params = await props.params;
  try {
    const payload = await parseAccessToken();

    if (!payload) {
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await deleteWhitelist({
      memberId: payload.userId,
      channelId: params.channelId,
    });

    return NextResponse.json({ message: '등록이 해제되었습니다.', data });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

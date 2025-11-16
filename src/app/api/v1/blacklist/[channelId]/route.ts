import { NextRequest, NextResponse } from 'next/server';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { parseAccessToken } from '@/libraries/oracledb/auth/service';
import { deleteBlacklist, postBlacklist } from '@/libraries/oracledb/blacklist/service';

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
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await postBlacklist({
      memberEmail: payload.email,
      channelId: params.channelId,
    });

    return NextResponse.json({ message: '블록되었습니다.', data }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/blacklist/[channelId]', error);
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
      console.error('id token is not provided');
      throw new CustomServerError({ statusCode: 401, message: '로그인이 필요합니다.' });
    }

    const data = await deleteBlacklist({
      memberEmail: payload.email,
      channelId: params.channelId,
    });

    return NextResponse.json({ message: '블록이 해제되었습니다.', data });
  } catch (error) {
    console.error('DELETE /api/v1/blacklist/[channelId]', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

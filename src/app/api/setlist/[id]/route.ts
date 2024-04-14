import CustomServerError from '@/model/error/customServerError';
import errorHandler from '@/model/error/handler';
import { deleteSetlist } from '@/model/oracleDB/setlist/service';
import parseAccessToken from '@api/_lib/parseAccessToken';
import { NextRequest, NextResponse } from 'next/server';
import { checkVideoId } from './validation';
import { SETLIST_DELETE_LEVEL } from './type';

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await parseAccessToken();
    if (!payload || payload.userLv < SETLIST_DELETE_LEVEL) {
      throw new CustomServerError({ message: '권한이 없습니다.', statusCode: 401 });
    }
    const videoId = checkVideoId(params.id);
    await deleteSetlist(videoId);
    return NextResponse.json({ message: '삭제되었습니다.', data: 'ok' });
  } catch (error) {
    console.error(error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}
export const dynamic = 'force-dynamic';

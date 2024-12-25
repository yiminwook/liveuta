import errorHandler from '@/libraries/error/handler';
import { getAllSetlist, searchSetlist } from '@/libraries/oracleDB/setlist/service';
import parseAccessToken from '@/utils/parseAccessToken';
import { NextRequest, NextResponse } from 'next/server';
import * as validation from './validation';

export async function GET(request: NextRequest) {
  try {
    const payload = await parseAccessToken();
    const memberId = payload?.userId || 0;
    const searchParams = request.nextUrl.searchParams;
    const query = validation.checkQuery(searchParams.get('query')); // DESCRIPTION query
    const start = validation.checkStart(searchParams.get('start'));
    const orderType = validation.checkOrderType(searchParams.get('sort'));
    const isFavorite = validation.checkIsFavorite(searchParams.get('isFavorite'));

    const data = query
      ? await searchSetlist({ query, memberId, startRow: start, orderType, isFavorite })
      : await getAllSetlist({ memberId, startRow: start, orderType, isFavorite });

    return NextResponse.json({ message: '세트리스트를 조회 하였습니다.', data });
  } catch (error) {
    console.error(error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

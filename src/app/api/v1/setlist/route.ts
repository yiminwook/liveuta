import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/libraries/error/handler';
import { parseAccessToken } from '@/libraries/oracledb/auth/service';
import { getAllSetlist, searchSetlist } from '@/libraries/oracledb/setlist/service';
import * as validation from './validation';

export async function GET(request: NextRequest) {
  try {
    const payload = await parseAccessToken();
    const memberEmail = payload?.email || '';
    const searchParams = request.nextUrl.searchParams;
    const query = validation.checkQuery(searchParams.get('query')); // DESCRIPTION query
    const start = validation.checkStart(searchParams.get('start'));
    const orderType = validation.checkOrderType(searchParams.get('sort'));
    const isFavorite = validation.checkIsFavorite(searchParams.get('isFavorite'));

    const data = query
      ? await searchSetlist({
          query,
          memberEmail,
          startRow: start,
          orderType,
          isFavorite,
        })
      : await getAllSetlist({ memberEmail, startRow: start, orderType, isFavorite });

    return NextResponse.json({ message: '세트리스트를 조회 하였습니다.', data });
  } catch (error) {
    console.error('GET /api/v1/setlist', error);
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message, data: null }, { status });
  }
}

export const dynamic = 'force-dynamic';

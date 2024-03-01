import BadReqError from '@/model/error/badRequestError';
import errorHandler from '@/model/error/handler';
import { getAllSetlist, searchSetlist } from '@/model/oracleDB/setlist/service';
import checkRequestUrl from '@api/_lib/checkRequestUrl';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    checkRequestUrl();

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));

    if (isNaN(page)) throw new BadReqError('unexpected query parameter: page');

    const result = query ? await searchSetlist(query, page) : await getAllSetlist(page);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ status, message });
  }
}

export const dynamic = 'force-dynamic';

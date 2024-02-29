import BadReqError from '@/model/error/badRequestError';
import errorHandler from '@/model/error/handler';
import { searchSetlist } from '@/model/oracleDB/setlist/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));

    if (!query) throw new BadReqError('query is required');
    if (isNaN(page)) throw new BadReqError('page is required');

    const result = await searchSetlist(query, page);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ status, message });
  }
}

export const dynamic = 'force-dynamic';

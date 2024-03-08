import BadReqError from '@/model/error/badRequestError';
import errorHandler from '@/model/error/handler';
import { getAllSetlist, searchSetlist } from '@/model/oracleDB/setlist/service';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const query = searchParams.get('q');
    const startRow = Number(searchParams.get('r'));
    const order = searchParams.get('o') as 'create' | 'broadcast' | undefined;

    if (isNaN(startRow)) throw new BadReqError('unexpected query parameter: page');
    if (!order || !['create', 'broadcast'].includes(order)) {
      throw new BadReqError('unexpected query parameter: order');
    }

    const orderType = order === 'create' ? 'CREATE_AT' : 'BROADCAST_AT';

    const result = query
      ? await searchSetlist(query, startRow, orderType)
      : await getAllSetlist(startRow, orderType);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ status, message });
  }
}

export const dynamic = 'force-dynamic';

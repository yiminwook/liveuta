'use server';
import { getAllSetlist, searchSetlist } from '@/model/oracleDB/setlist/service';
import parseAccessToken from '../_lib/parseAccessToken';

export async function GET(arg: {
  query: string;
  startRow: number;
  orderType: 'CREATE_AT' | 'BROADCAST_AT';
  accessToken: string | null;
  isFavorite: boolean;
}) {
  const payload = arg.accessToken ? await parseAccessToken(arg.accessToken) : { id: 0 };
  // Guest일경우 id를 0으로 설정
  const result = arg.query
    ? await searchSetlist({
        query: arg.query,
        startRow: arg.startRow,
        memberId: payload.id,
        orderType: arg.orderType,
        isFavorite: arg.isFavorite,
      })
    : await getAllSetlist({
        startRow: arg.startRow,
        memberId: payload.id,
        orderType: arg.orderType,
        isFavorite: arg.isFavorite,
      });

  return result;
}

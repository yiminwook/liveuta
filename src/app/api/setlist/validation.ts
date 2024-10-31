import BadReqError from '@/libraries/error/badRequestError';
import { SetlistOrder } from '@/libraries/oracleDB/setlist/sql';

export const checkQuery = (query: string | null) => {
  if (typeof query !== 'string') {
    throw new BadReqError('올바르지 않은 query입니다.');
  }
  return query;
};

export const checkStart = (start: string | null) => {
  const startNumber = Number(start);
  if (isNaN(startNumber)) {
    throw new BadReqError('올바르지 않은 start입니다.');
  }
  return startNumber;
};

export const checkOrderType = (orderType: string | null) => {
  if (orderType !== 'broadcast' && orderType !== 'create') {
    throw new BadReqError('올바르지 않은 orderType입니다.');
  }
  return orderType === 'broadcast' ? SetlistOrder.broadcast : SetlistOrder.create;
};

export const checkIsFavorite = (isFavorite: string | null) => {
  if (isFavorite !== 'true' && isFavorite !== 'false') {
    throw new BadReqError('올바르지 않은 isFavorite입니다.');
  }
  return isFavorite === 'true';
};

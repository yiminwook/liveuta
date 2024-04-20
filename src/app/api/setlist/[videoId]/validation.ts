import BadReqError from '@/model/error/badRequestError';

export const checkDescription = (body: any): string => {
  if (typeof body.description !== 'string') {
    throw new BadReqError('올바르지 않은 description입니다.');
  }
  return body.description;
};

import BadReqError from '@/libraries/error/badRequestError';
import { type UnsafeUnwrappedHeaders, headers } from 'next/headers';

export default function checkReferer() {
  const referer = (headers() as unknown as UnsafeUnwrappedHeaders).get('referer') || '';
  const domain = process.env.NEXT_PUBLIC_SITE_URL;
  const regExp = new RegExp(domain);
  const result = regExp.test(referer);
  if (!result) throw new BadReqError('올바르지 않은 클라이언트 요청입니다.');
}

import BadReqError from '@/model/error/badRequestError';
import { headers } from 'next/headers';

const checkRequestUrl = async () => {
  'use server';
  const headerList = headers();
  const host = headerList.get('host');
  const url = host === 'localhost:3000' ? 'http://localhost:3000' : `https://${host}`;

  if (url !== process.env.NEXT_PUBLIC_SITE_URL) {
    throw new BadReqError('unexpected request url');
  }
};

export default checkRequestUrl;

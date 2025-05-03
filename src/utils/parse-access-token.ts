import { Payload } from '@/types/next-auth';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export default async function parseAccessToken() {
  const headerList = await headers();
  const accessToken = headerList.get('Authorization')?.split('Bearer ')[1];
  if (!accessToken) return null;
  return jwt.verify(accessToken, process.env.ACCESS_SECRET) as Payload;
}

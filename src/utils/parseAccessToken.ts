import { Payload } from '@/types/nextAuth';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function parseAccessToken() {
  const headerList = headers();
  const accessToken = headerList.get('Authorization')?.split('Bearer ')[1];
  if (!accessToken) return null;
  return jwt.verify(accessToken, process.env.ACCESS_SECRET) as Payload;
}

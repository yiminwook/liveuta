import CustomServerError from '@/model/error/customServerError';
import { Payload } from '@/type/nextAuth';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function parseAccessToken() {
  'use server';
  const headerList = headers();
  const accessToken = headerList.get('Authorization')?.split('Bearer ')[1];
  if (!accessToken) {
    throw new CustomServerError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
  const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET) as Payload;
  return payload;
}

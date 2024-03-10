'use server';
import { Payload } from '@/type/nextAuth';
import jwt from 'jsonwebtoken';

export default async function parseAccessToken(accessToken: string) {
  const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET) as Payload;
  return payload;
}

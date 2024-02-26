import CustomServerError from '@/model/error/customServerError';
import errorHandler from '@/model/error/handler';
import { jwtAuth } from '@/model/google/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const code = url.searchParams.get('code');

    if (!code) {
      throw new CustomServerError({ statusCode: 404, message: 'cannot find google code' });
    }

    const token = await jwtAuth.getToken(code);

    const { refresh_token } = token.tokens;

    if (!refresh_token) {
      throw new CustomServerError({ statusCode: 404, message: 'cannot find google token' });
    }

    const cookieStore = cookies();
    const threeMonth = 60 * 60 * 24 * 30 * 3;
    cookieStore.set('refresh_token', refresh_token, { maxAge: threeMonth });

    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL, { status: 302 });
  } catch (error) {
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = 'force-dynamic';

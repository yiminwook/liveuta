import errorHandler from '@/libraries/error/handler';
import { REDIRECT_URL, jwtAuth } from '@/temps/auth/auth';
import { NextRequest, NextResponse } from 'next/server';

// youtube scope 'https://www.googleapis.com/auth/youtube.readonly'
export async function GET(_request: NextRequest) {
  try {
    const url = jwtAuth.generateAuthUrl({
      access_type: 'offline', //offline일경우 accessToken, refreshToken 둘다
      include_granted_scopes: true,
      scope: ['openid', 'profile', 'email'],
      redirect_uri: REDIRECT_URL,
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const dynamic = 'force-dynamic';

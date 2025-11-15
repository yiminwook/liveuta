import { NextResponse } from 'next/server';
import errorHandler from '@/libraries/error/handler';
import { GMAIL_SCOPE, oauth2Client } from '@/libraries/google';

export async function GET() {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', //offline일경우 accessToken, refreshToken 둘다
      include_granted_scopes: true,
      prompt: 'consent', // 매번 리프레쉬 토큰을 새로 받기위함.
      scope: ['openid', 'profile', 'email', GMAIL_SCOPE],
    });

    return NextResponse.redirect(url, { status: 302 });
  } catch (error) {
    console.error('GET /api/auth', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

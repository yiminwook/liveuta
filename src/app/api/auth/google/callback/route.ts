import CustomServerError from '@/model/error/customServerError';
import { jwtAuth } from '@/model/google/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { Session } from '@/type/api/auth';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const url = new URL(request.nextUrl);
    const code = url.searchParams.get('code');

    if (!code) {
      throw new CustomServerError({ statusCode: 404, message: 'cannot find google code' });
    }

    const token = await jwtAuth.getToken(code);

    const { refresh_token, id_token } = token.tokens;

    console.log('tokens', token.tokens);

    if (!id_token) {
      throw new CustomServerError({ statusCode: 404, message: 'cannot find google token' });
    }

    const userInfo = jwt.decode(id_token) as {
      iss: string;
      azp: string;
      aud: string;
      sub: string;
      email: string;
      email_verified: boolean;
      at_hash: string;
      name: string;
      picture: string;
      given_name: string;
      family_name: string;
      locale: string;
      iat: number;
      exp: number;
    };

    const threeMonth = 60 * 60 * 24 * 30 * 3;

    const session: Session = {
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      locale: userInfo.locale,
      provider: 'google',
    };

    const sessionToken = jwt.sign(session, process.env.AUTH_SECRET, {
      expiresIn: threeMonth,
    });

    cookieStore.set('sessionToken', sessionToken, { maxAge: threeMonth });

    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL, { status: 302 });
  } catch (error) {
    console.error('Google callback', error);
    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL + '/login', { status: 302 });
  }
}

export const dynamic = 'force-dynamic';

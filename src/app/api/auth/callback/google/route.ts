import { NextRequest, NextResponse } from 'next/server';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { oauth2Client } from '@/libraries/google';
import { updateMetadataValue } from '@/libraries/oracledb/metadata/service';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      throw new CustomServerError({ statusCode: 500, message: 'code is not provided' });
    }

    const token = await oauth2Client.getToken(code);
    const accessToken = token.tokens.access_token;
    const refreshToken = token.tokens.refresh_token;

    if (!accessToken) {
      throw new CustomServerError({ statusCode: 500, message: 'access token is not provided' });
    }

    if (!refreshToken) {
      throw new CustomServerError({ statusCode: 500, message: 'refresh token is not provided' });
    }

    const userInfo = await oauth2Client.getTokenInfo(accessToken);

    await updateMetadataValue({
      key: 'google_refresh_token',
      value: refreshToken,
    });

    return NextResponse.json({ message: 'updated credentials', sender: userInfo.email });
  } catch (error) {
    console.error('GET /api/auth/callback/google', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

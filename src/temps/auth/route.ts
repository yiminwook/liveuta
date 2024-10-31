import { getAccessToken } from '@/libraries/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const code = searchParams.get('code');

  console.log('GET /api/auth', code);
  const accessToken = await getAccessToken();
  console.log('GET accessToken', accessToken);

  return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL, { status: 302 });
}

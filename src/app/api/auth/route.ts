import errorHandler from '@/model/error/handler';
import FirebaseAdmin from '@/model/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // const url = jwtAuth.generateAuthUrl({
    //   access_type: 'offline', //offline일경우 accessToken, refreshToken 둘다
    //   include_granted_scopes: true,
    //   scope: ['openid', 'profile', 'email'],
    // });

    // FirebaseAdmin.getInstance().auth.verifyIdToken();

    return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL, { status: 302 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

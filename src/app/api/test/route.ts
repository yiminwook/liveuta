import errorHandler from '@/model/error/handler';
import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/model/oracleDB/auth/service';

export async function GET(request: NextRequest) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({}, { status: 404 });
    }

    const email = 'grs0421@gmail.com';
    const provider = 'google';

    const useInfo = await login({ email, provider });
    return NextResponse.json({ useInfo });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete('refresh_token');
  return NextResponse.json({ message: 'ok' }, { status: 200 });
}

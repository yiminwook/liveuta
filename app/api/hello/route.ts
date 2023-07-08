import errorHandler from '@/models/error/handler';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_req: NextRequest) => {
  try {
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
};

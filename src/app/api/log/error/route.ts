import errorHandler from '@/model/error/handler';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body: {
      message: string;
      stack: string;
      digest?: string;
    } = await req.json();
    console.error('Front 500 Error', body.message);
    console.log('digest', body.digest);
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
}

import errorHandler from '@/libraries/error/handler';
import { getAllMetadata } from '@/libraries/oracleDB/metadata/service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const metadata = await getAllMetadata();
    return NextResponse.json(metadata);
  } catch (error) {
    const { message, status } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

import { connectOracleDB } from '@/model/oracleDB/connection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    const connection = await connectOracleDB();

    connection.close();
    console.log('diconnected to OracleDB');
    return NextResponse.json({ message: 'Connected to OracleDB' });
  } catch (error) {
    return NextResponse.json({ message: 'Error connecting to OracleDB' });
  }
}

export const dynamic = 'force-dynamic';

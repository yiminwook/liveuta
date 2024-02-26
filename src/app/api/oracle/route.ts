import { connectDB } from '@/model/oracleDB';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    console.log('Connecting to OracleDB...');
    const connection = await connectDB();
    console.log('Connected to OracleDB', connection);

    connection.close();
    return NextResponse.json({ message: 'Connected to OracleDB' });
  } catch (error) {
    return NextResponse.json({ message: 'Error connecting to OracleDB' });
  }
};

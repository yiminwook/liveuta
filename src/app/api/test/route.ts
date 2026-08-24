import { NextResponse } from 'next/server';
import { endpointApi, VIDEOS } from '@/libraries/endpoint';

export async function GET(request: Request) {
  try {
    const response = await endpointApi.get(VIDEOS.live).json();
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

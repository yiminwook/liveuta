import CustomServerError from '@/models/error/customServerError';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  let status = 200;
  let message = 'ok';

  try {
    const body: {
      name: string;
      value: string;
      maxAge?: number;
    } = await req.json();

    const res = NextResponse.json({ message }, { status });

    res.cookies.set({
      name: body.name,
      value: body.value,
      path: '/',
      // httpOnly: true,
      // sameSite: "none",
      // secure: process.env.VERCEL_ENV ? true : false,
      maxAge: body.maxAge,
    });

    console.log(res.cookies.getAll());
    return res;
  } catch (error) {
    console.error(error);
    status = error instanceof CustomServerError ? error.statusCode : 500;
    message = error instanceof CustomServerError ? error.message : 'unknown error';
    return NextResponse.json({ message }, { status });
  }
};

export const DELETE = async (req: NextRequest) => {
  let status = 200;
  let message = 'ok';

  try {
    const name = new URL(req.nextUrl).searchParams.get('name');

    if (!name) {
      throw new CustomServerError({ statusCode: 404, message: 'name is not exist' });
    }

    const res = NextResponse.json({ message }, { status });
    res.cookies.delete(name.toString());
    return res;
  } catch (error) {
    status = error instanceof CustomServerError ? error.statusCode : 500;
    message = error instanceof CustomServerError ? error.message : 'unknown error';
    return NextResponse.json({ message }, { status });
  }
};

// export const runtime = 'edge';

import { sendSignInLinkToEmail } from 'firebase/auth';
import { ActionCodeSettings } from 'firebase-admin/auth';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import FirebaseClient from '@/libraries/firebase/client';
import { signInDto } from '@/types/dto';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const dto = signInDto.safeParse(json);

    if (dto.error) {
      throw new BadReqError(z.prettifyError(dto.error));
    }

    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL + `/${dto.data.locale}/auth/callback`);
    url.searchParams.set('email', dto.data.email);

    const actionCodeSettings: ActionCodeSettings = {
      url: url.toString(),
      handleCodeInApp: true,
    };

    console.log('actionCodeSettings', actionCodeSettings);

    await sendSignInLinkToEmail(
      FirebaseClient.getInstance().auth,
      dto.data.email,
      actionCodeSettings,
    );

    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
}

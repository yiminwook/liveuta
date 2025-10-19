import { FirebaseError } from 'firebase/app';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { ActionCodeSettings } from 'firebase-admin/auth';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import FirebaseClient from '@/libraries/firebase/client';
import { postMember } from '@/libraries/oracledb/auth/service';
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

    await postMember({ email: dto.data.email });

    console.log('SENT EMAIL VAFICATION LINK TO', dto.data.email);

    await sendSignInLinkToEmail(
      FirebaseClient.getInstance().auth,
      dto.data.email,
      actionCodeSettings,
    );

    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/sign-in', error);

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/quota-exceeded':
          return NextResponse.json({ message: '요청량이 초과되었습니다.' }, { status: 599 });
        case 'auth/user-disabled':
          return NextResponse.json({ message: '제한된 사용자입니다.' }, { status: 599 });
        default:
          return NextResponse.json(
            { message: '인증도중 오류가 발생했습니다. 관리자에게 문의하세요.' },
            { status: 599 },
          );
      }
    }

    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

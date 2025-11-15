import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import BadReqError from '@/libraries/error/badRequestError';
import CustomServerError from '@/libraries/error/customServerError';
import errorHandler from '@/libraries/error/handler';
import { sendMail } from '@/libraries/mail';
import { getAllMetadata } from '@/libraries/oracledb/metadata/service';

const sendEmailDto = z.object({
  email: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const dto = sendEmailDto.safeParse(json);

    if (dto.error) {
      throw new BadReqError(z.prettifyError(dto.error));
    }

    const metadata = await getAllMetadata();
    const refreshToken = metadata.google_refresh_token;

    if (!refreshToken) {
      throw new CustomServerError({ statusCode: 500, message: 'refresh token is not provided' });
    }

    const res = await sendMail({
      to: dto.data.email,
      title: '라이브우타 인증코드 입니다.',
      body: '<div>Hello</div>',
      refreshToken,
    });

    return NextResponse.json({ message: 'Mail sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST /api/v1/send-mail', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

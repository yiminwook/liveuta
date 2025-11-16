import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import { sendMail } from '@/libraries/mail';
import { postMember } from '@/libraries/oracledb/auth/service';
import { getMetadataByKey } from '@/libraries/oracledb/metadata/service';
import { GOOGLE_REFRESH_TOKEN_KEY } from '@/types';

const sendEmailDto = z.object({
  email: z.email({ error: '이메일 형식이 올바르지 않습니다.' }),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const dto = sendEmailDto.safeParse(json);

    if (dto.error) {
      throw new BadReqError(z.prettifyError(dto.error));
    }

    const verificationCode = await postMember({ email: dto.data.email });

    const refreshToken = await getMetadataByKey({ key: GOOGLE_REFRESH_TOKEN_KEY });

    const res = await sendMail({
      to: dto.data.email,
      title: '라이브우타 인증코드 입니다.',
      body: `<div>${verificationCode}</div>`,
      refreshToken,
    });

    return NextResponse.json({ message: 'Mail sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST /api/v1/send-mail', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

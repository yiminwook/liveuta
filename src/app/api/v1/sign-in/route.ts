import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import dayjs from '@/libraries/dayjs';
import BadReqError from '@/libraries/error/badRequestError';
import errorHandler from '@/libraries/error/handler';
import {
  generateAccessToken,
  getMemberByEmail,
  updateMemberLoginAt,
} from '@/libraries/oracledb/auth/service';
import { signInDto } from '@/types/dto';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const dto = signInDto.safeParse(json);

    if (dto.error) {
      throw new BadReqError(z.prettifyError(dto.error));
    }

    const user = await getMemberByEmail({ email: dto.data.email });

    if (user.verificationCode !== dto.data.verificationCode) {
      throw new BadReqError('인증코드가 일치하지 않습니다.');
    }

    if (user.expiresAt.isBefore(dayjs())) {
      throw new BadReqError('인증코드가 만료되었습니다.');
    }

    await updateMemberLoginAt({ email: user.email });
    const session = generateAccessToken({ email: user.email });

    // 로컬스토리지에 accessToken 저장
    return NextResponse.json({ message: 'success', data: { session } });
  } catch (error) {
    console.error('POST /api/v1/sign-in', error);

    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

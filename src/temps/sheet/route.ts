//ts-ignore

import { PushData } from '@api/push/route';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/libraries/error/handler';
import { jwtAuth } from '@/libraries/firebase/admin';
import { getSheet } from '@/temps/sheet';
import { parseAllData, parseScheduledData } from '@/temps/sheet/parseContentSheet';
import { SheetAPIReturntype } from '@/temps/sheet/sheet';

export async function GET(_req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('select')?.value || 'all';

    const sheetData = await getSheet({
      spreadsheetId: process.env.CONTENTS_SHEET_ID!,
      range: process.env.CONTENTS_SHEET_RANGE!,
    });

    const { scheduled, live } = parseScheduledData(sheetData);
    const { daily, all } = parseAllData(sheetData);

    switch (cookie) {
      case 'video':
        scheduled.contents = scheduled.contents.filter((item) => item.isVideo === true);
        live.contents = live.contents.filter((item) => item.isVideo === true);
        daily.contents = daily.contents.filter((item) => item.isVideo === true);
        all.contents = all.contents.filter((item) => item.isVideo === true);
        break;
      case 'stream':
        scheduled.contents = scheduled.contents.filter((item) => item.isVideo !== true);
        live.contents = live.contents.filter((item) => item.isVideo !== true);
        daily.contents = daily.contents.filter((item) => item.isVideo !== true);
        all.contents = all.contents.filter((item) => item.isVideo !== true);
        break;
      default:
        break;
    }

    return NextResponse.json<SheetAPIReturntype | undefined>(
      { scheduled, live, daily, all },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const requsetBody: PushData = await req.json();

    const value = [
      requsetBody.title,
      requsetBody.body,
      requsetBody.imageUrl,
      requsetBody.link,
      requsetBody.timestamp,
      requsetBody.token,
    ];

    const sheetData = await getSheet({
      spreadsheetId: process.env.PUSH_SHEET_ID!,
      range: process.env.PUSH_SHEET_RANGE!,
    });

    if (sheetData.values === null || sheetData.values === undefined) {
      throw new Error('sheetData is forbidden');
    }

    const isSaved = sheetData.values.some(
      (item) => item[5] === requsetBody.token && item[3] === requsetBody.link,
    );

    if (isSaved) {
      return NextResponse.json({ message: '이미 등록된 알림입니다.' }, { status: 226 });
    }

    const lastRow = sheetData.values.length + 1;

    const accessToken = await jwtAuth.getAccessToken();
    if (!accessToken.token) throw new Error('accessToken is not exist');

    const sheetService = google.sheets({ version: 'v4', auth: jwtAuth });

    const res = await sheetService.spreadsheets.values.update({
      access_token: accessToken.token,
      spreadsheetId: process.env.PUSH_SHEET_ID,
      range: process.env.PUSH_SHEET_RANGE + '!A' + lastRow.toString(),
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        majorDimension: 'rows',
        values: [value],
      },
    });

    const data = res.data;
    return NextResponse.json({ message: '알림이 성공적으로 등록되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
};

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

export const dynamic = 'force-dynamic';

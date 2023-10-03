import { SheetAPIReturntype } from '@/types/inSheet';
import { getSheet } from '@/models/sheet';
import { parseAllData, parseScheduledData } from '@/utils/parseContentSheet';
import { serverEnvConfig } from '@/configs/envConfig';
import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/models/error/handler';
import { cookies } from 'next/headers';

const { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } = serverEnvConfig();

export const GET = async (_req: NextRequest) => {
  try {
    const cookieStore = cookies();
    const cookie = cookieStore.get('select')?.value || 'all';

    const sheetData = await getSheet({ spreadsheetId: CONTENTS_SHEET_ID, range: CONTENTS_SHEET_RANGE, cache: false });
    let { scheduled, live } = parseScheduledData(sheetData);
    let { daily, all } = parseAllData(sheetData);

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

    return NextResponse.json<SheetAPIReturntype | undefined>({ scheduled, live, daily, all }, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
};

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

export const dynamic = 'force-dynamic';

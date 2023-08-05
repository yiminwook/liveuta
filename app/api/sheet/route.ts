import { SheetAPIReturntype } from '@/types/inSheet';
import { getSheet } from '@/models/sheet';
import { parseAllData, parseScheduledData } from '@/utils/parseContentSheet';
import { serverEnvConfig } from '@/configs';
import { NextRequest, NextResponse } from 'next/server';
import errorHandler from '@/models/error/handler';

const { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } = serverEnvConfig();

export const GET = async (_req: NextRequest) => {
  try {
    const sheetData = await getSheet({ spreadsheetId: CONTENTS_SHEET_ID, range: CONTENTS_SHEET_RANGE, cache: false });
    const { scheduled, live } = parseScheduledData(sheetData);
    const { daily, all } = parseAllData(sheetData);

    return NextResponse.json<SheetAPIReturntype | undefined>({ scheduled, live, daily, all }, { status: 200 });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ error: message }, { status });
  }
};

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

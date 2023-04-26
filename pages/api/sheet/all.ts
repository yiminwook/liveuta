import type { NextApiRequest, NextApiResponse } from 'next';
import { SheetAPIReturnType } from '@/models/sheet/InSheet';
import { getNow } from '@/utils/GetTime';
import { getSheet } from '@/models/sheet/Sheets';
import { parseYoutubeContent } from '@/utils/ParseContentSheet';
import getENV from '@/utils/GetENV';
import { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } from '@/consts';

const handler = async (req: NextApiRequest, res: NextApiResponse<SheetAPIReturnType>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');
    const spreadsheetId = getENV(CONTENTS_SHEET_ID);
    const range = getENV(CONTENTS_SHEET_RANGE);
    const sheetData = await getSheet({ spreadsheetId, range });
    const nowTime = getNow(true);
    const parsedSheetData = parseYoutubeContent({ data: sheetData, nowTime, showAll: true });
    const total = parsedSheetData.length;
    return res.status(200).json({ total, contents: parsedSheetData });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ total: 0, contents: [] });
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

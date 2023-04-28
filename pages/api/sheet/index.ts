import type { NextApiRequest, NextApiResponse } from 'next';
import { SheetAPIReturntype } from '@/models/sheet/InSheet';
import { getSheet } from '@/models/sheet/Sheets';
import { parseAllData, parseScheduledData } from '@/utils/ParseContentSheet';
import getENV from '@/utils/GetENV';
import { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } from '@/consts';

const handler = async (req: NextApiRequest, res: NextApiResponse<SheetAPIReturntype | undefined>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');
    const spreadsheetId = getENV(CONTENTS_SHEET_ID);
    const range = getENV(CONTENTS_SHEET_RANGE);
    const sheetData = await getSheet({ spreadsheetId, range });
    const { scheduled, live } = parseScheduledData(sheetData);
    const { daily, all } = parseAllData(sheetData);

    return res.status(200).json({ scheduled, live, daily, all });
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

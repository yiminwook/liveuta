import type { NextApiRequest, NextApiResponse } from 'next';
import { SheetAPIReturntype } from '@/models/sheet/inSheet';
import { getSheet } from '@/models/sheet';
import { parseAllData, parseScheduledData } from '@/utils/parseContentSheet';
import { serverEnvConfig } from '@/configs';

const { CONTENTS_SHEET_ID, CONTENTS_SHEET_RANGE } = serverEnvConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse<SheetAPIReturntype | undefined>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');

    const sheetData = await getSheet({ spreadsheetId: CONTENTS_SHEET_ID, range: CONTENTS_SHEET_RANGE });
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

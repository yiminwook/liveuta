import type { NextApiRequest, NextApiResponse } from 'next';
import { UpcomingData } from '@/models/sheet/Insheet';
import { getNow } from '@/utils/get_time';
import { getGoogleSheetData } from '@/models/sheet/GoogleSheet';
import parseSheetData from '@/utils/parseSheetData';
import getEnv from '@/utils/get_env';

const handler = async (req: NextApiRequest, res: NextApiResponse<{ total: number; upcoming: UpcomingData[] }>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');
    const spreadsheetId = getEnv('spreadsheetId');
    const key = getEnv('sheet_apiKey');
    const range = getEnv('upcoming_sheet_range');
    const sheetData = await getGoogleSheetData({ spreadsheetId, key, range });
    const nowTime = getNow(true);
    /** 24시간 */
    const intervalTime = 24 * 60 * 60 * 1000;
    const parsedSheetData = parseSheetData({ data: sheetData, nowTime, intervalTime, showAll: true });
    const total = parsedSheetData.length;
    return res.status(200).json({ total, upcoming: parsedSheetData });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ total: 0, upcoming: [] });
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

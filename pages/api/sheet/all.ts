import type { NextApiRequest, NextApiResponse } from 'next';
import { UpcomingData } from '@/models/sheet/Insheet';
import { getNow } from '@/utils/GetTime';
import { getGoogleSheet } from '@/models/sheet/GoogleSheet';
import parseYoutubeContentData from '@/utils/ParseSheetData';
import getENV from '@/utils/GetENV';

const handler = async (req: NextApiRequest, res: NextApiResponse<{ total: number; upcoming: UpcomingData[] }>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');
    const spreadsheetId = getENV('spreadsheetId');
    const key = getENV('sheet_apiKey');
    const range = getENV('upcoming_sheet_range');
    const sheetData = await getGoogleSheet({ spreadsheetId, key, range });
    const nowTime = getNow(true);
    /** 24시간 */
    const intervalTime = 24 * 60 * 60 * 1000;
    const parsedSheetData = parseYoutubeContentData({ data: sheetData, nowTime, intervalTime, showAll: true });
    const total = parsedSheetData.length;
    return res.status(200).json({ total, upcoming: parsedSheetData });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ total: 0, upcoming: [] });
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

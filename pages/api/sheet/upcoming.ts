import type { NextApiRequest, NextApiResponse } from 'next';
import { UpcomingData } from '@/models/sheet/in_sheet';
import { getNow } from '@/utils/get_time';
import { getGoogleSheetData } from '@/models/sheet/google_sheet';
import parseSheetData from '@/utils/parseSheetData';

const handler = async (req: NextApiRequest, res: NextApiResponse<{ total: number; upcoming: UpcomingData[] }>) => {
  try {
    if (req.method !== 'GET') throw new Error('invaild method');
    const sheetData = await getGoogleSheetData();
    const nowTime = getNow(true);
    /** default 2시간 지연 */
    const intervalTime = +(process.env.interval_time ?? 7200000);
    const parsedSheetData = parseSheetData({ data: sheetData, nowTime, intervalTime });
    const total = parsedSheetData.length;
    return res.status(200).json({ total, upcoming: parsedSheetData });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ total: 0, upcoming: [] });
  }
};

export default handler;

// https://developers.google.com/sheets/api/guides/concepts?hl=ko#cell

import { serverEnvConfig } from '@/configs/envConfig';
import { getSheet } from '@/models/sheet';
import { ChannelRowType } from '@/types/inYoutube';

const { CHANNELS_SHEET_ID, CHANNELS_SHEET_RANGE } = serverEnvConfig();

/** Parse Google spread sheet - reference */
export const parseChannelIDSheet = async () => {
  const sheetData = await getSheet({ spreadsheetId: CHANNELS_SHEET_ID, range: CHANNELS_SHEET_RANGE });
  const sheetDataValues = sheetData.values as ChannelRowType[];
  if (!(sheetDataValues && sheetDataValues.length >= 2)) throw new Error('sheetData has not values');
  sheetDataValues.shift();
  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

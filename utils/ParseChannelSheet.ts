import { CHANNELS_SHEET_ID, CHANNELS_SHEET_RANGE } from '@/consts';
import { getSheet } from '@/models/sheet/Sheets';
import { ChannelRowType } from '@/models/youtube/InChannel';
import getENV from '@/utils/GetENV';

/** Parse Google spread sheet - reference */
export const parseChannelIDSheet = async () => {
  const spreadsheetId = getENV(CHANNELS_SHEET_ID);
  const range = getENV(CHANNELS_SHEET_RANGE);
  const sheetData = await getSheet({ spreadsheetId, range });
  const sheetDataValues = sheetData.values as ChannelRowType[];
  if (!(sheetDataValues && sheetDataValues.length >= 2)) throw new Error('sheetData has not values');
  sheetDataValues.shift();
  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

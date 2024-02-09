import { getSheet } from '@/model/sheet';
import { ChannelRowType } from '@/type/api/youtube';

/** Parse Google spread sheet - reference */
export const parseChannelIDSheet = async () => {
  const sheetData = await getSheet({
    spreadsheetId: process.env.CHANNELS_SHEET_ID,
    range: process.env.CHANNELS_SHEET_RANGE,
  });
  const sheetDataValues = sheetData.values as ChannelRowType[];
  if (!(sheetDataValues && sheetDataValues.length >= 2))
    throw new Error('sheetData has not values');
  sheetDataValues.shift();
  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

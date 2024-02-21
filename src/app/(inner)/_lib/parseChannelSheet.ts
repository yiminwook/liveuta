import { readDB } from '@/model/mongoDBService';
import { ChannelDocument } from '@/type/api/mongoDB';

/** Parse Google spread sheet - reference */
export const parseChannelIDSheet = async () => {
  const collection = process.env.MONGODB_CHANNEL_COLLECTION;
  const database = process.env.MONGODB_CHANNEL_DB;
  const sheetDataValues: ChannelDocument[] = await readDB(collection, database, {
    sort: { name_kor: 1 },
  });

  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

// const sheetData = await getSheet({
//   spreadsheetId: process.env.CHANNELS_SHEET_ID,
//   range: process.env.CHANNELS_SHEET_RANGE,
// });
// const sheetDataValues = sheetData.values as ChannelRowType[];
// if (!(sheetDataValues && sheetDataValues.length >= 2))
//   throw new Error('sheetData has not values');
// sheetDataValues.shift();

import { readDB } from '@/model/mongoDBService';
import { ChannelDocument } from '@/type/api/mongoDB';

export const parseChannelIDSheet = async () => {
  const collection = process.env.MONGODB_CHANNEL_COLLECTION;
  const database = process.env.MONGODB_CHANNEL_DB;
  const sheetDataValues: ChannelDocument[] = await readDB(collection, database, {
    sort: { name_kor: 1 },
  });

  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

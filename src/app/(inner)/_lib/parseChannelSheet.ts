import { MONGODB_CHANNEL_COLLECTION, MONGODB_CHANNEL_DB } from '@/const';
import { connectMongoDB } from '@/model/mongoDB';
import { ChannelDocument } from '@/type/api/mongoDB';

export const parseChannelIDSheet = async () => {
  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const sheetDataValues = await db.find<ChannelDocument>({}).sort({ name_kor: 1 }).toArray();

  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

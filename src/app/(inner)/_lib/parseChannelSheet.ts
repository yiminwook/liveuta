import { connectDB } from '@/model/mongoDB';
import { ChannelDocument } from '@/type/api/mongoDB';

export const parseChannelIDSheet = async () => {
  const collection = process.env.MONGODB_CHANNEL_COLLECTION;
  const database = process.env.MONGODB_CHANNEL_DB;
  const db = await connectDB(database, collection);
  const sheetDataValues = await db.find<ChannelDocument>({}).sort({ name_kor: 1 }).toArray();

  const totalLength = sheetDataValues.length;
  return { totalLength, sheetDataValues };
};

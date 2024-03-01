import { MONGODB_CHANNEL_COLLECTION, MONGODB_CHANNEL_DB } from '@/const';
import { connectMongoDB } from '@/model/mongoDB';
import { Promised } from '@/type';
import { ChannelDocument } from '@/type/api/mongoDB';

export type ChannelData = Promised<typeof getAllChannel>;
export type ChannleDatesetItem = ReturnType<typeof parseChannel>;
export type ChannelDataset = ReturnType<typeof generateChannelObject>;

export const getChannel = async (channel_id: string) => {
  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channel = await db.findOne<ChannelDocument>({ channel_id });
  return channel;
};

export const getAllChannel = async () => {
  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db.find<ChannelDocument>({}).sort({ name_kor: 1 }).toArray();
  channels[0].channel_addr;
  const totalLength = channels.length;
  return { totalLength, channels };
};

export const parseChannel = (channel: ChannelDocument | null) => ({
  channel_id: channel?.channel_id || '',
  channel_addr: channel?.channel_addr || '',
  name_kor: channel?.name_kor || '',
  handle_name: channel?.handle_name || '',
});

export const generateChannelObject = (channels: ChannelDocument[]) => {
  return Object.fromEntries(channels.map((channel) => [channel.channel_id, parseChannel(channel)]));
};

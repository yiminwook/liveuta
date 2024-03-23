import { MONGODB_CHANNEL_COLLECTION, MONGODB_CHANNEL_DB } from '@/const';
import { connectMongoDB } from '@/model/mongoDB';
import { ChannelData, ChannelDocument } from '@/type/api/mongoDB';

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
  return channels.map<ChannelData>((channel) => {
    delete channel._id;
    return channel;
  });
};

export const parseChannel = (channel: ChannelDocument | null) => ({
  channelId: channel?.channel_id || 'no data',
  channelAddr: channel?.channel_addr || 'no data',
  nameKor: channel?.name_kor || 'no data',
  // handleName: channel?.handle_name || '',
});

export const generateChannelObject = (channels: ChannelDocument[]) => {
  return Object.fromEntries(channels.map((channel) => [channel.channel_id, parseChannel(channel)]));
};

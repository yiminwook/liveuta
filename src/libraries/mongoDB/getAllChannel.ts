import { addExcapeCharacter } from '@/utils/regexp';
import { MONGODB_CHANNEL_COLLECTION, MONGODB_CHANNEL_DB } from '@/constants';
import { connectMongoDB } from './';
import { ChannelData, ChannelDocument } from '@/types/api/mongoDB';
import { z } from 'zod';

export type ChannleDatesetItem = ReturnType<typeof parseChannel>;
export type ChannelDataset = ReturnType<typeof generateChannelObject>;

export const getChannel = async (channel_id: string) => {
  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channel = await db.findOne<ChannelDocument>({ channel_id });
  return channel;
};

export type TChannelDto = z.infer<typeof channelDto>;
export const channelDto = z.object({
  order: z
    .enum(['createdAt', 'name_kor'])
    .nullish()
    .transform((value) => value || 'name_kor'),
  size: z.preprocess((input) => Number(input ?? 0), z.number().int()),
});

export const CHANNEL_ORDER_MAP = {
  createdAt: -1, // 최신순
  name_kor: 1, // 이름순
} as const;

export const getAllChannel = async (dto: TChannelDto) => {
  const direction = CHANNEL_ORDER_MAP[dto.order];

  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db
    .find<ChannelDocument>({})
    .sort(dto.order, direction)
    .limit(dto.size)
    .toArray();
  return channels.map<ChannelData>((channel) => {
    delete channel._id;
    return channel;
  });
};

export const searchChannel = async (query: string) => {
  const trimedQuery = addExcapeCharacter(query.trim());
  if (trimedQuery === '') {
    return [];
  } else {
    const regexforDBQuery = { $regex: trimedQuery, $options: 'i' };
    const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
    const channels = await db
      .find<ChannelDocument>({ name_kor: regexforDBQuery })
      .sort({ name_kor: 1 })
      .toArray();
    return channels.map<ChannelData>((channel) => {
      delete channel._id;
      return channel;
    });
  }
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

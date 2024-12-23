import { ITEMS_PER_PAGE, MONGODB_CHANNEL_COLLECTION, MONGODB_CHANNEL_DB } from '@/constants';
import { TChannelData, TChannelDocument } from '@/types/api/mongoDB';
import { combineChannelData } from '@/utils/combineChannelData';
import { addExcapeCharacter } from '@/utils/regexp';
import { z } from 'zod';
import { connectMongoDB } from './';

export const channelDto = z.object({
  query: z.string().nullish(),
  page: z.preprocess((input) => Number(input ?? 1), z.number().int().min(1)),
  size: z.preprocess((input) => Number(input ?? 1), z.number().int().min(1).max(ITEMS_PER_PAGE)),
  sort: z
    .enum(['createdAt', 'name_kor'])
    .nullish()
    .transform((value) => value || 'name_kor'),
});

export const CHANNEL_ORDER_MAP = {
  createdAt: -1, // 최신순
  name_kor: 1, // 이름순
} as const;

export type TChannelDto = z.infer<typeof channelDto>;
export type TYChannelReturn = ReturnType<typeof getChannelWithYoutube>;
export type ChannelDatesetItem = ReturnType<typeof parseChannel>;

export const getChannelById = async (channel_id: string) => {
  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channel = await db.findOne<TChannelDocument>({ channel_id });
  return channel;
};

export const getAllChannel = async (dto: TChannelDto) => {
  const direction = CHANNEL_ORDER_MAP[dto.sort];

  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db.find<TChannelDocument>({}).sort(dto.sort, direction).toArray();

  return channels.map<TChannelData>((channel) => {
    delete channel._id;
    return channel;
  });
};

export const getChannelWithYoutube = async (dto: TChannelDto) => {
  const { sort, size, page, query } = dto;
  const direction = CHANNEL_ORDER_MAP[sort];
  const safeQuery = addExcapeCharacter((query || '').trim());
  const regexforDBQuery = { name_kor: { $regex: safeQuery, $options: 'i' } };
  const skip = (page - 1) * size;

  const db = await connectMongoDB(MONGODB_CHANNEL_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db
    .find<TChannelDocument>(!!query ? regexforDBQuery : {})
    .sort(sort, direction)
    .skip(skip)
    .limit(size)
    .toArray();

  const total = await db.countDocuments(!!query ? regexforDBQuery : {});
  const totalPage = Math.ceil(total / size);

  const channelRecord = channels.reduce<Record<string, TChannelData>>((acc, curr) => {
    delete curr._id;
    acc[curr.channel_id] = { ...curr };
    return acc;
  }, {});

  const combinedChannelContents = await combineChannelData(channelRecord, { sort: sort });

  return { contents: combinedChannelContents, total, totalPage };
};

export const parseChannel = (channel: TChannelDocument | null) => ({
  channelId: channel?.channel_id || 'no data',
  channelAddr: channel?.channel_addr || 'no data',
  nameKor: channel?.name_kor || 'no data',
  // handleName: channel?.handle_name || '',
});

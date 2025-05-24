import { ITEMS_PER_PAGE, MONGODB_CHANNEL_COLLECTION, MONGODB_MANAGEMENT_DB } from '@/constants';
import {
  TChannelDocument,
  TChannelDocumentWithoutId,
  WaitingListItem,
} from '@/libraries/mongodb/type';
import { combineChannelData } from '@/utils/combineChannelData';
import { combineSingleYTData } from '@/utils/combineChannelData-v2';
import { addEscapeCharacter } from '@/utils/regexp';
import { z } from 'zod';
import { connectMongoDB } from '.';
import { getYoutubeChannelsByUid } from '../youtube';

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
  const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_CHANNEL_COLLECTION);
  const channel = await db.findOne<TChannelDocument>({ channel_id });
  return channel;
};

export const getAllChannel = async (dto: TChannelDto) => {
  const direction = CHANNEL_ORDER_MAP[dto.sort];

  const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db
    .find<TChannelDocumentWithoutId>({ waiting: false }, { projection: { _id: 0 } })
    .sort(dto.sort, direction)
    .toArray();

  return channels;
};

export const getChannelWithYoutube = async (dto: TChannelDto) => {
  const { sort, size, page, query } = dto;
  const direction = CHANNEL_ORDER_MAP[sort];
  const safeQuery = addEscapeCharacter((query || '').trim());
  const regexforDBQuery = { names: { $regex: safeQuery, $options: 'i' }, waiting: false };
  const skip = (page - 1) * size;

  const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db
    .find<TChannelDocumentWithoutId>(!!query ? regexforDBQuery : { waiting: false }, {
      projection: { _id: 0 },
    })
    .sort(sort, direction)
    .skip(skip)
    .limit(size)
    .toArray();

  const total = await db.countDocuments(!!query ? regexforDBQuery : { waiting: false });
  const totalPage = Math.ceil(total / size);

  const channelRecord = channels.reduce<Record<string, TChannelDocumentWithoutId>>((acc, curr) => {
    acc[curr.channel_id] = { ...curr };
    return acc;
  }, {});

  const combinedChannelContents = await combineChannelData(channelRecord, { sort: sort });

  return { contents: combinedChannelContents, total, totalPage };
};

export const getChannelWithYoutubeById = async (channelId: string) => {
  const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_CHANNEL_COLLECTION);
  const channel = await db.findOne<TChannelDocumentWithoutId>(
    {
      channel_id: channelId,
    },
    {
      projection: { _id: 0 },
    },
  );

  if (!channel) {
    throw new Error(`Channel with ID ${channelId} not found`);
  }

  const youtubeData = await getYoutubeChannelsByUid(channelId);

  const singleYoutubeData = youtubeData.items?.[0];

  if (!singleYoutubeData) {
    throw new Error(`YouTube data for channel ID ${channelId} not found`);
  }

  return combineSingleYTData(channel, singleYoutubeData);
};

export const parseChannel = (channel: TChannelDocument | null) => ({
  channelId: channel?.channel_id || 'no data',
  channelAddr: channel?.channel_addr || 'no data',
  nameKor: channel?.name_kor || 'no data',
  // handleName: channel?.handle_name || '',
});

export async function getWaitingList() {
  const db = await connectMongoDB(MONGODB_MANAGEMENT_DB, MONGODB_CHANNEL_COLLECTION);
  const channels = await db
    .find<WaitingListItem>(
      { waiting: true },
      {
        projection: {
          name_kor: 1,
          channel_addr: 1,
        },
      },
    )
    .toArray();

  return channels;
}

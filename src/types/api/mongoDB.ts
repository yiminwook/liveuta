import dayjs from '@/libraries/dayjs';
import { StreamCategory } from '..';

export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export const STAT_MAPPER = {
  TRUE: 'stream',
  FALSE: 'closed',
  NULL: 'scheduled',
} as const;

export interface TChannelDocument {
  _id?: string;
  channel_id: string;
  name_kor: string;
  channel_addr: string;
  handle_name: string;
  createdAt: string;
  waiting: boolean;
  alive: boolean;
}

export type TChannelData = Omit<TChannelDocument, '_id'>;
export type TChannelListData = Record<string, TChannelData>;

export type ContentDocumentRaw = Omit<ContentDocument, 'ScheduledTime'> & { ScheduledTime: Date };

export type ContentDocument = {
  _id?: string;
  Title: string;
  URL: string;
  ChannelName: string;
  ScheduledTime: dayjs.Dayjs;
  broadcastStatus: string;
  Hide: isStream;
  isVideo: 'TRUE' | 'FALSE';
  concurrentViewers: number;
  VideoId: string;
  ChannelId: string;
  category: string;
  tag: string;
};

export type ContentsLength = {
  total: number;
  video: number;
  stream: number;
};

export type TContentsData = {
  title: string;
  channelName: string;
  videoId: string;
  channelId: string;
  timestamp: number;
  isStream: isStream;
  korTime: string;
  interval: string;
  isVideo: boolean;
  viewer: number;
  category: StreamCategory;
  tag: string;
};

export type TContentsDataReturn = TContentsData[];

export type TParseScheduledDataReturn = {
  scheduled: TContentsDataReturn;
  live: TContentsDataReturn;
};

export type TParseAllDataReturn = {
  daily: TContentsDataReturn;
  all: TContentsDataReturn;
};

export type TScheduleAPIReturn = TParseAllDataReturn & TParseScheduledDataReturn;

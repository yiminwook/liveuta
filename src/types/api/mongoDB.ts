import dayjs from '@/libraries/dayjs';
import { youtube_v3 } from 'googleapis';

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
  names: string[];
  channel_addr: string;
  handle_name: string;
  createdAt: string;
  waiting: boolean;
  alive: boolean;
}

export type TChannelData = Omit<TChannelDocument, '_id'>;
export type TChannelListData = Record<string, TChannelData>;

export type ContentDocument = {
  _id?: string;
  Title: string;
  URL: string;
  ScheduledTime: Date;
  broadcastStatus: isStream;
  Hide: isStream;
  isVideo: 'TRUE' | 'FALSE';
  concurrentViewers: number;
  VideoId: string;
  ChannelId: string;
  tag: string;
};

export type ContentDocumentWithDayjs = Omit<ContentDocument, '_id' | 'ScheduledTime'> & {
  ScheduledTime: dayjs.Dayjs;
};

export type ContentLength = {
  total: number;
  video: number;
  stream: number;
};

export type TContentData = {
  title: string;
  videoId: string;
  channelId: string;
  timestamp: number;
  isStream: isStream;
  utcTime: Date;
  interval: string;
  isVideo: boolean;
  viewer: number;
  tag: string;
};

export type TContentsDataReturn = TContentData[];

export type TParseScheduledDataReturn = {
  scheduled: TContentsDataReturn;
  live: TContentsDataReturn;
};

export type TParseAllDataReturn = {
  daily: TContentsDataReturn;
  all: TContentsDataReturn;
};

export type TScheduleAPIReturn = TParseAllDataReturn & TParseScheduledDataReturn;

export type TFeaturedDocument = {
  _id: string;
  top_channels: string[];
  promising: string[];
  last_updated: string;
};

export type TFeaturedData = Omit<TFeaturedDocument, '_id'>;

export type TFeaturedDataAPIReturn = {
  lastUpdateAt: string;
  topRating: youtube_v3.Schema$Channel[];
  promising: youtube_v3.Schema$Channel[];
};

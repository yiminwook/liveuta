import dayjs from '@/libraries/dayjs';
import { youtube_v3 } from 'googleapis';

export type TStream = 'TRUE' | 'NULL' | 'FALSE';

export const STREAM_STATUS_MAPPER = {
  TRUE: 'stream',
  FALSE: 'closed',
  NULL: 'scheduled',
} as const;

export type TChannelDocument = {
  _id?: string;
  channel_id: string;
  name_kor: string;
  names: string[];
  channel_addr: string;
  handle_name: string;
  createdAt: string;
  waiting: boolean;
  alive: boolean;
  profile_picture_url: string;
};

export type TChannelDocumentWithoutId = Omit<TChannelDocument, '_id'>;
export type TChannelRecord = Record<string, TChannelDocumentWithoutId>;

export type TContentDocument = {
  _id?: string;
  Title: string;
  URL: string;
  ScheduledTime: Date;
  broadcastStatus: TStream;
  /** 취소된 스케줄은 TRUE로 표시 */
  Hide: 'TRUE' | 'FALSE';
  isVideo: 'TRUE' | 'FALSE';
  concurrentViewers: string;
  VideoId: string;
  ChannelId: string;
  tag: string;
};

export type TParsedServerContent = {
  title: string;
  videoId: string;
  channelId: string;
  broadcastStatus: TStream;

  viewer: string;
  tag: string;
  utcTime: Date;

  // 가공된 데이터
  isVideo: boolean;
  isHide: boolean;
};

export type TParsedClientContent = {
  videoId: string;
  channelId: string;
  broadcastStatus: TStream;
  isHide: boolean;
  isVideo: boolean;
  tag: string;

  // 가공된 데이터
  title: string;
  viewer: number;
  utcTime: dayjs.Dayjs;
  interval: string;
};

export type TContentLength = {
  total: number;
  video: number;
  stream: number;
};

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

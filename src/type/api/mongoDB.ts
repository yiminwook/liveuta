import dayjs from '@/model/dayjs';

export interface ChannelDocument {
  _id: string;
  channel_id: string;
  name_kor: string;
  channel_addr: string;
  handle_name: string;
  waiting: boolean;
}

export type ContentDocumentRaw = Omit<ContentDocument, 'ScheduledTime'> & { ScheduledTime: string };

export interface ContentDocument {
  _id: string;
  Title: string;
  URL: string;
  ChannelName: string;
  ScheduledTime: dayjs.Dayjs;
  ThumbnailURL: string;
  Hide: string;
  broadcastStatus: string;
  isVideo: string;
}

export interface ContentsLength {
  total: number;
  video: number;
  stream: number;
}

export interface DataReturnType {
  contents: any[];
  length: ContentsLength;
}

export interface ParseAllDataReturnType {
  daily: DataReturnType;
  all: DataReturnType;
}

export interface ParseScheduledDataReturnType {
  scheduled: DataReturnType;
  live: DataReturnType;
}

export interface ContentsDataType {
  title: string;
  url: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  thumbnailURL?: string;
  isStream: isStream;
  korTime: string;
  interval: string;
  isVideo: boolean;
}

export interface MongoDBAPIReturntype {
  scheduled: DataReturnType;
  live: DataReturnType;
  daily: DataReturnType;
  all: DataReturnType;
}

export type isStream = 'TRUE' | 'NULL' | 'FALSE';

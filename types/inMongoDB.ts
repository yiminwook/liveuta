import dayjs from '@/models/dayjs';

export type {
  ContentDocument,
  DocumentList,
  ContentsLength,
  DataReturnType,
  ParseAllDataReturnType,
  ParseScheduledDataReturnType,
  ContentsDataType,
  MongoDBAPIReturntype,
  ChannelDocument,
};

interface ChannelDocument {
  _id: string;
  channel_id: string;
  name_kor: string;
  channel_addr: string;
  handle_name: string;
  waiting: boolean;
}

interface ContentDocument {
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

interface DocumentList {
  documents: ContentDocument[];
}

interface ContentsLength {
  total: number;
  video: number;
  stream: number;
}

interface DataReturnType {
  contents: any[];
  length: ContentsLength;
}

interface ParseAllDataReturnType {
  daily: DataReturnType;
  all: DataReturnType;
}

interface ParseScheduledDataReturnType {
  scheduled: DataReturnType;
  live: DataReturnType;
}

interface ContentsDataType {
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

interface MongoDBAPIReturntype {
  scheduled: DataReturnType;
  live: DataReturnType;
  daily: DataReturnType;
  all: DataReturnType;
}

export type isStream = 'TRUE' | 'NULL' | 'FALSE';

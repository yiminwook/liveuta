import dayjs from '@/model/dayjs';

export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export interface ChannelDocument {
  _id: string;
  channel_id: string;
  name_kor: string;
  channel_addr: string;
  handle_name: string;
  waiting: boolean;
}

export type ContentDocumentRaw = Omit<ContentDocument, 'ScheduledTime'> & { ScheduledTime: Date };

export type ContentDocument = {
  _id: string;
  Title: string;
  URL: string;
  ChannelName: string;
  ScheduledTime: dayjs.Dayjs;
  ThumbnailURL: string;
  Hide: string;
  broadcastStatus: string;
  isVideo: string;
};

export type ContentsLength = {
  total: number;
  video: number;
  stream: number;
};

export type ContentsDataType = {
  title: string;
  channelName: string;
  videoId: string;
  timestamp: number;
  isStream: isStream;
  korTime: string;
  interval: string;
  isVideo: boolean;
};

export type DataReturnType = {
  contents: ContentsDataType[];
  length: ContentsLength;
};

export type ParseScheduledDataReturnType = {
  scheduled: DataReturnType;
  live: DataReturnType;
};

export type ParseAllDataReturnType = {
  daily: DataReturnType;
  all: DataReturnType;
};

export type ScheduleAPIReturntype = ParseAllDataReturnType & ParseScheduledDataReturnType;

import dayjs from '@/libraries/dayjs';

export type isStream = 'TRUE' | 'NULL' | 'FALSE';

export interface ChannelDocument {
  _id?: string;
  channel_id: string;
  name_kor: string;
  channel_addr: string;
  handle_name: string;
  waiting: boolean;
}

export type ChannelData = Omit<ChannelDocument, '_id'>;
export type ChannelListData = Record<string, ChannelData>;

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
  channelId: string;
  timestamp: number;
  isStream: isStream;
  korTime: string;
  interval: string;
  isVideo: boolean;
  viewer: number;
};

export type ContentsDataReturnType = ContentsDataType[];

export type ParseScheduledDataReturnType = {
  scheduled: ContentsDataReturnType;
  live: ContentsDataReturnType;
};

export type ParseAllDataReturnType = {
  daily: ContentsDataReturnType;
  all: ContentsDataReturnType;
};

export type ScheduleAPIReturntype = ParseAllDataReturnType & ParseScheduledDataReturnType;

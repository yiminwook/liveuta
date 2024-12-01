import { youtube_v3 } from 'googleapis';

export type TChannelRow = [string, string, string];

export interface TChannelsData extends youtube_v3.Schema$Channel {
  uid: string;
  channelName: string;
  url: string;
  snippet: youtube_v3.Schema$ChannelSnippet;
  statistics: youtube_v3.Schema$ChannelStatistics;
}

export interface TChannelsDataList extends youtube_v3.Schema$Channel {
  channels: TChannelsData[];
  total: number;
}

export interface TChannelAPIReturn {
  total: number;
  contents: TChannelsData[];
}

import { youtube_v3 } from 'googleapis';

export type TYChannelRow = [string, string, string];

export interface TYChannelsData extends youtube_v3.Schema$Channel {
  uid: string;
  channelName: string;
  url: string;
  createdAt: string;
  snippet: youtube_v3.Schema$ChannelSnippet;
  statistics: youtube_v3.Schema$ChannelStatistics;
  alive: boolean;
}

export interface TYChannelsDataList extends youtube_v3.Schema$Channel {
  channels: TYChannelsData[];
  total: number;
}

export interface TYChannelAPIReturn {
  total: number;
  contents: TYChannelsData[];
}

import { youtube_v3 } from 'googleapis';

export type ChannelRowType = [string, string, string];

export interface ChannelsDataType extends youtube_v3.Schema$Channel {
  uid: string;
  channelName: string;
  url: string;
  snippet: youtube_v3.Schema$ChannelSnippet;
  statistics: youtube_v3.Schema$ChannelStatistics;
}

export interface ChannelAPIReturnType {
  totalLength: number;
  contents: ChannelsDataType[];
}

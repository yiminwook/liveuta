import { youtube_v3 } from 'googleapis';

export type TYChannelRow = [string, string, string];

export interface TYChannelsData extends youtube_v3.Schema$Channel {
  snippet?: youtube_v3.Schema$ChannelSnippet;
  statistics?: youtube_v3.Schema$ChannelStatistics;
  uid: string;
  channelName: string;
  url: string;
  createdAt: string;
  alive: boolean;
}

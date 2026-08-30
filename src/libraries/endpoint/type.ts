export type TStream = 'TRUE' | 'NULL' | 'FALSE';

export const STREAM_STATUS_MAPPER = {
  TRUE: 'stream',
  FALSE: 'closed',
  NULL: 'scheduled',
} as const;

export interface TEndpointVideo {
  VideoId: string;
  Title: string;
  ChannelName: string;
  ChannelId: string;
  ScheduledTime: string;
  thumbnail_url: string;
  broadcastStatus: TStream;
  Hide: 'TRUE' | 'FALSE';
  // isVideo: 'TRUE' | 'FALSE';
  isVideo: 'TRUE' | 'FALSE'; // 필요
  concurrentViewers: number;
}

export interface TEndpointVideoResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    has_next: boolean;
  };
}

export interface TEndpointChannel {
  channel_addr: string;
  channel_id: string;
  handle_name: string;
  name_kor: string;
  waiting: boolean;
  names: string[];
  profile_picture_url: string;
}

export type TEndpointChannelResponse = TEndpointChannel[];

export type TEndpointChannelMetaResponse = {
  /** example: "2026-08-30T05:19:08.548312Z */
  updated_at: string;
  count: number;
};

export interface TEndpointFeatured {
  channel_addr: string;
  channel_id: string;
  handle_name: string;
  name_kor: string;
  waiting: boolean;
  names: string[];
  profile_picture_url: string;
}

export interface TEndpointFeaturedResponse {
  top_channels: TEndpointFeatured[];
  video_pick: TEndpointVideo[];
  /** example: "2024-12-26T00:58:24.806153+09:00 */
  last_updated: string;
}

export type Function<T> = (...args: any) => T;
export type Promised<T extends Function<any>> = Awaited<ReturnType<T>>;

export type TTheme = 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5';

export enum StreamFilter {
  scheduled = 'scheduled',
  live = 'live',
  daily = 'daily',
  all = 'all',
}

/**
 * 로딩중 - null
 * 에러 - undefined
 * 성공 - string
 */
export type TToken = null | undefined | string;

export type ServerActionResponse<T> = {
  status: number;
  message: string;
  result: T;
};

export type TMetadata = {
  cover_image_url: string;
  default_video_id: string;
  app_runtime_version: string;
};

export const GOOGLE_REFRESH_TOKEN_KEY = 'google_refresh_token';

export const CHANNEL_QUERY_TYPE = ['name', 'handle', 'channelId'] as const;
export type TChannelQueryType = (typeof CHANNEL_QUERY_TYPE)[number];

export const CHANNEL_SORT = ['createdAt', 'name_kor'] as const;
export type TChannelSort = (typeof CHANNEL_SORT)[number];

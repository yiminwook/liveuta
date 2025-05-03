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
};

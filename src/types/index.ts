export type Function<T> = (...args: any) => T;
export type Promised<T extends Function<any>> = Awaited<ReturnType<T>>;

export type TTheme = 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5';

export enum FilterType {
  scheduled = 'scheduled',
  live = 'live',
  daily = 'daily',
  all = 'all',
}

export enum StreamCategory {
  default = 'default',
  live = 'live',
  anniversary = 'anniversary',
  relay = 'relay',
  endurance = 'endurance',
}

export type FeaturedCategories = Exclude<StreamCategory, StreamCategory.default>;

export enum StreamCategoryText {
  default = '기본',
  live = '라이브',
  anniversary = '기념일',
  relay = '릴레이',
  endurance = '내구',
}

export type StreamCategoryType = keyof typeof StreamCategory;

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

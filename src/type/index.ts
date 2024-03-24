export type Function<T> = (...args: any) => T;
export type Promised<T extends Function<any>> = Awaited<ReturnType<T>>;

export type ThemeType = 'theme1' | 'theme2' | 'theme3' | 'theme4';

export enum VideoType {
  all = 'all',
  stream = 'stream',
  video = 'video',
}

export enum SelectedText {
  total = '전체',
  stream = '방송',
  video = '동영상',
}

/**
 * 로딩중 - null
 * 에러 - undefined
 * 성공 - string
 */
export type TokenType = null | undefined | string;

export type ServerActionResponse<T> = {
  status: number;
  message: string;
  result: T;
};

export type Function<T> = (...args: any) => T;
export type Promised<T extends Function<any>> = Awaited<ReturnType<T>>;

export type ThemeType = 'theme1' | 'theme2' | 'theme3' | 'theme4';
export type SelectType = 'all' | 'stream' | 'video';

/**
 * 로딩중 - null
 * 에러 - undefined
 * 성공 - string
 */
export type TokenType = null | undefined | string;

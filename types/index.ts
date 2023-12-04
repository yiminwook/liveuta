export type Promised<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

export type ThemeType = 'theme1' | 'theme2' | 'theme3' | 'theme4';
export type SelectType = 'all' | 'stream' | 'video';
/**
 * 로딩중 - null
 * 에러 - undefined
 * 성공 - string
 */
export type TokenType = null | undefined | string;

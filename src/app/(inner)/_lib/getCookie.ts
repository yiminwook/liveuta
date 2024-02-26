import { Promised, SelectType, ThemeType } from '@/type';
import { cookies } from 'next/headers';

export type GetCookiesReturnType = Promised<typeof getCookies>;
export const getCookies = async () => {
  'use server';
  const cookieStore = cookies();
  const select = cookieStore.get('select')?.value as SelectType | undefined;
  const theme = cookieStore.get('theme')?.value as ThemeType | undefined;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  return {
    theme: theme || 'theme1',
    select: select || 'all',
    refreshToken,
  };
};

import { Promised, SelectType, ThemeType } from '@/types';
import { cookies } from 'next/headers';

export type GetCookiesReturnType = Promised<typeof getCookies>;
export const getCookies = async () => {
  'use server';
  const cookieStore = cookies();
  const select = cookieStore.get('select')?.value as SelectType | undefined;
  const theme = cookieStore.get('theme')?.value as ThemeType | undefined;

  return {
    theme: theme || 'theme1',
    select: select || 'all',
  };
};

import { Promised, TTheme } from '@/types';
import { cookies } from 'next/headers';

export type TGetCookiesReturn = Promised<typeof getCookies>;
export const getCookies = async () => {
  'use server';
  const cookieStore = await cookies();
  const select = cookieStore.get('select')?.value as string | undefined;
  const theme = cookieStore.get('theme')?.value as TTheme | undefined;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  return {
    theme: theme || 'theme1',
    select: select || 'all',
    refreshToken,
  };
};

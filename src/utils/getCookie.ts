import { Promised } from '@/types';
import { cookies } from 'next/headers';

export type TGetCookiesReturn = Promised<typeof getCookies>;
export const getCookies = async () => {
  'use server';
  const cookieStore = await cookies();
  const select = cookieStore.get('select')?.value as string | undefined;
  const refreshToken = cookieStore.get('refresh_token')?.value;
  const locale = cookieStore.get('NEXT_LOCALE')?.value;

  return {
    select: select || 'all',
    refreshToken,
    locale,
  };
};

import 'server-only';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getQueryClient = cache(() => new QueryClient());

export const getCookies = cache(async () => {
  const cookieStore = await cookies();
  const select = cookieStore.get('select')?.value as string | undefined;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  return {
    select: select || 'all',
    refreshToken,
  };
});

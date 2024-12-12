import getQueryClient from '@/apis/getQueryClient';
import DataFetchingObserver from '@/components/common/DataFetchingObserver';
import PageView from '@/components/common/PageView';
import { auth } from '@/libraries/nextAuth';
import { TGetChannelRes } from '@api/v1/channel/route';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import axios from 'axios';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channelList'],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/v1/channel', {
        next: { revalidate: 60, tags: ['channel'] }, // 1분간 캐시
      })
        .then((res) => res.json() as Promise<TGetChannelRes>)
        .then((res) => res.data),
  });

  if (session) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['blacklist'],
        queryFn: () =>
          axios
            .get<{ message: string; data: string[] }>(
              `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/blacklist`,
              {
                headers: { Authorization: `Bearer ${session.user.accessToken}` },
              },
            )
            .then((res) => res.data.data),
      }),
      queryClient.prefetchQuery({
        queryKey: ['whitelist'],
        queryFn: () =>
          axios
            .get<{ message: string; data: string[] }>(
              `${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/whitelist`,
              {
                headers: { Authorization: `Bearer ${session.user.accessToken}` },
              },
            )
            .then((res) => res.data.data),
      }),
    ]);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DataFetchingObserver />
      <PageView>{children}</PageView>
    </HydrationBoundary>
  );
}

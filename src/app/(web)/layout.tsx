import { auth } from '@/libraries/nextAuth';
import { GetChannelRes } from '@api/v1/channel/route';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';
import { PropsWithChildren } from 'react';
import getQueryClient from '@/apis/getQueryClient';
import PageView from '@/components/common/PageView';
import DataFetchingObserver from '@/components/common/DataFetchingObserver';

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channelList'],
    queryFn: () =>
      axios
        .get<GetChannelRes>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/channel`)
        .then((res) => res.data.data),
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

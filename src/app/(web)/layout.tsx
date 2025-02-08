import getQueryClient from '@/apis/getQueryClient';
import DataFetchingObserver from '@/components/common/DataFetchingObserver';
import PageView from '@/components/common/PageView';
import BottomTab from '@/components/common/bottomTab/BottomTab';
import Header from '@/components/common/header/Header';
import AccountSidebar from '@/components/common/sidebar/Account';
import { TGetChannelRes } from '@api/v1/channel/route';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channelList'],
    queryFn: () =>
      fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/v1/channel', {
        next: { revalidate: 1800, tags: ['channel'] },
      })
        .then((res) => res.json() as Promise<TGetChannelRes>)
        .then((res) => res.data),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <DataFetchingObserver />
      <PageView>
        <Header />
        <>{children}</>
        <BottomTab />
        <AccountSidebar />
      </PageView>
    </HydrationBoundary>
  );
}

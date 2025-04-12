import { serverApi } from '@/apis/fetcher';
import getQueryClient from '@/apis/getQueryClient';
import DataFetchingObserver from '@/components/common/DataFetchingObserver';
import PageView from '@/components/common/PageView';
import BottomTab from '@/components/common/bottomTab/BottomTab';
import Header from '@/components/common/header/Header';
import AccountSidebar from '@/components/common/sidebar/Account';
import { CHANNELS_TAG } from '@/constants/revalidateTag';
import { TGetChannelRes } from '@api/v1/channel/route';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CHANNELS_TAG],
    queryFn: () =>
      serverApi
        .get<TGetChannelRes>('v1/channel', {
          next: { revalidate: 1800, tags: [CHANNELS_TAG] },
        })
        .json()
        .then((json) => json.data),
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

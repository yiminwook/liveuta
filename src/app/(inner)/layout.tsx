import { auth } from '@/model/nextAuth';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import { getAllBlackList } from './_action/blacklist';
import { getAllChannelList } from './_action/channelList';
import Background from './_component/Background';
import Header from './_component/header/Header';
import PageView from './_component/PageView';
import AccountSidebar from './_component/sidebar/Account';
import Sidebar from './_component/sidebar/Sidebar';
import { getQueryClient } from './_lib/getQueryClient';
import serverActionHandler from './_lib/serverActionHandler';
import LayoutDataObserver from './layout.data';

const FloatButton = dynamic(() => import('./_component/float/FloatButton'), {
  ssr: false,
});

const Footer = dynamic(() => import('./_component/Footer'), { ssr: false });

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channelList'],
    queryFn: () => serverActionHandler(getAllChannelList()),
  });

  if (session) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['blackList'],
        queryFn: () =>
          serverActionHandler(getAllBlackList({ accessToken: session.user.accessToken })),
      }),
    ]);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PageView>
        <LayoutDataObserver session={session} />
        <Header session={session} />
        <Background>{children}</Background>
        <Footer />
        <FloatButton />
        <Sidebar />
        {session && <AccountSidebar session={session} />}
      </PageView>
    </HydrationBoundary>
  );
}

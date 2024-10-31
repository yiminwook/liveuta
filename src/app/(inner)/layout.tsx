import { auth } from '@/libraries/nextAuth';
import { GetChannelRes } from '@api/channel/route';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import getQueryClient from '@/apis/getQueryClient';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/header/Header';
import PageView from '@/components/common/PageView';
import AccountSidebar from '@/components/common/sidebar/Account';
import Sidebar from '@/components/common/sidebar/Sidebar';
import LayoutDataObserver from './layout.data';

const BottomTab = dynamic(() => import('@/components/common/bottomTab/BottomTab'), { ssr: false });

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['channelList'],
    queryFn: () =>
      axios
        .get<GetChannelRes>(`${process.env.NEXT_PUBLIC_SITE_URL}/api/channel`)
        .then((res) => res.data.data),
  });

  if (session) {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['blacklist'],
        queryFn: () =>
          axios
            .get<{ message: string; data: string[] }>(
              `${process.env.NEXT_PUBLIC_SITE_URL}/api/blacklist`,
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
              `${process.env.NEXT_PUBLIC_SITE_URL}/api/whitelist`,
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
      <PageView>
        <LayoutDataObserver session={session} />
        <Header session={session} />
        {children}
        <Footer />
        <BottomTab />
        <Sidebar />
        {session && <AccountSidebar session={session} />}
      </PageView>
    </HydrationBoundary>
  );
}

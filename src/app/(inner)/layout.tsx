import { auth } from '@/model/nextAuth';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import Header from './_component/header/Header';
import PageView from './_component/PageView';
import AccountSidebar from './_component/sidebar/Account';
import Sidebar from './_component/sidebar/Sidebar';
import { getQueryClient } from './_lib/getQueryClient';
import LayoutDataObserver from './layout.data';
import axios from 'axios';
import { GetChannelRes } from '@api/channel/route';

const BottomTab = dynamic(() => import('./_component/bottomTab/BottomTab'), { ssr: false });

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

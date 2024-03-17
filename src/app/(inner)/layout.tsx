import { auth } from '@/model/nextAuth';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import Background from './_component/Background';
import PageView from './_component/PageView';
import Header from './_component/header/Header';
import AccountSidebar from './_component/sidebar/Account';
import Sidebar from './_component/sidebar/Sidebar';

const FloatButton = dynamic(() => import('./_component/float/FloatButton'), {
  ssr: false,
});

const Footer = dynamic(() => import('./_component/Footer'), { ssr: false });

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();
  return (
    <PageView>
      <Header session={session} />
      <Background>{children}</Background>
      <Footer />
      <FloatButton />
      <Sidebar />
      {session && <AccountSidebar session={session} />}
    </PageView>
  );
}

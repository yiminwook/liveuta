import Footer from '@/components/common/Footer';
import BottomTab from '@/components/common/bottomTab/BottomTab';
import Header from '@/components/common/header/Header';
import AccountSidebar from '@/components/common/sidebar/Account';
import Sidebar from '@/components/common/sidebar/Sidebar';
import { auth } from '@/libraries/nextAuth';
import { PropsWithChildren } from 'react';

// const BottomTab = dynamic(() => import('@/components/common/bottomTab/BottomTab'));

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
      <BottomTab />
      <Sidebar />
      {session && <AccountSidebar session={session} />}
    </>
  );
}

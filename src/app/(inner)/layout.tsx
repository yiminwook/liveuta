import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import PageView from './_component/PageView';
import Header from './_component/header/Header';
import Sidebar from './_component/sidebar/Sidebar';
import dynamic from 'next/dynamic';
import { auth } from '@/model/nextAuth';
import AccountSidebar from './_component/sidebar/Account';
import * as styles from '@/style/global.css';

const FloatButton = dynamic(() => import('./_component/float/FloatButton'), {
  ssr: false,
});

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();
  return (
    <PageView>
      <Header session={session} />
      <main className={styles.main}>{children}</main>
      <div className="background-left" />
      <div className="background-right" />
      <Footer />
      <FloatButton />
      <Sidebar />
      {session && <AccountSidebar session={session} />}
    </PageView>
  );
}

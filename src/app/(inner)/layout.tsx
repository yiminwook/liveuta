import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import PageView from './_component/PageView';
import Header from './_component/header/Header';
import Sidebar from './_component/sidebar/Sidebar';
import dynamic from 'next/dynamic';
import { getSessionInServer } from '@/model/google/auth';

const FloatButton = dynamic(() => import('./_component/float/FloatButton'), {
  ssr: false,
});

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSessionInServer();

  return (
    <PageView>
      <Header session={session} />
      {children}
      <div className="background-left" />
      <div className="background-right" />
      <Footer />
      <FloatButton />
      <Sidebar />
    </PageView>
  );
}

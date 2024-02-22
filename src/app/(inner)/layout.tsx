import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import PageView from './_component/PageView';
import FloatButton from './_component/float/FloatButton';
import Header from './_component/header/Header';
import Sidebar from './_component/sidebar/Sidebar';
import dynamic from 'next/dynamic';

const FetchIndicator = dynamic(() => import('./_component/float/FetchIndicator'), {
  ssr: false,
});

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <PageView>
      <Header />
      {children}
      <div className="background-left" />
      <div className="background-right" />
      <Footer />
      <FloatButton />
      <FetchIndicator />
      <Sidebar />
    </PageView>
  );
}

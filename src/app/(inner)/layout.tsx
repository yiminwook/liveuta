import Loading from '@/app/loading';
import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import PageView from './_component/PageView';
import FetchIndicator from './_component/button/FetchIndicator';
import FloatButton from './_component/button/FloatButton';
import Header from './_component/header/Header';
import Sidebar from './_component/sidebar/Sidebar';

export default function Layout({ children }: PropsWithChildren) {
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
      <Loading />
    </PageView>
  );
}

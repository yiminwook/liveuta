import Loading from '@/app/loading';
import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import FloatButton from './_component/button/FlotButton';
import Header from './_component/header/Header';
import FetchIndicator from './_component/loading/FetchIndicator';
import PageView from './_component/PageView';
import dynamic from 'next/dynamic';

const ServiceWorker = dynamic(() => import('@inner/_component/ServiceWorker'), { ssr: false });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PageView>
      <Header />
      <main id="app">
        <ServiceWorker>{children} </ServiceWorker>
      </main>
      <div className="background-left" />
      <div className="background-right" />
      <Footer />
      <FloatButton />
      <div id="modal-root" />
      <FetchIndicator />
      <Loading />
    </PageView>
  );
}

import Loading from '@/app/loading';
import { PropsWithChildren } from 'react';
import Footer from './_component/Footer';
import FloatButton from './_component/button/FlotButton';
import Header from './_component/header/Header';
import FetchIndicator from './_component/loading/FetchIndicator';
import PageView from './_component/PageView';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <PageView>
      <Header />
      <main id="app">{children}</main>
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

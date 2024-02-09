'use client';
import Loading from '@/app/loading';
import { gtag } from '@inner/_lib/gtag';
import { PropsWithChildren, useEffect } from 'react';
import Footer from './_component/Footer';
import FloatButton from './_component/button/FlotButton';
import Header from './_component/header/Header';
import FetchIndicator from './_component/loading/FetchIndicator';

const Layout = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const location = window.location;
    const pathname = location.pathname;
    const search = location.search;
    gtag('event', 'page_view', { page_path: pathname + search });
  }, []);

  return (
    <>
      <Header />
      <main id="app">{children}</main>
      <div className="background-left" />
      <div className="background-right" />
      <Footer />
      <FloatButton />
      <div id="modal-root" />
      <FetchIndicator />
      <Loading />
    </>
  );
};

export default Layout;

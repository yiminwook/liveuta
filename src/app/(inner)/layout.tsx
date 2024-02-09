'use client';
import { PropsWithChildren, useEffect } from 'react';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/button/FlotButton';
import Header from '@/components/layout/Header';
import FetchIndicator from '@/components/layout/FetchIndicator';
import Loading from '@/app/loading';
import { gtag } from '@/util/gtag';

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

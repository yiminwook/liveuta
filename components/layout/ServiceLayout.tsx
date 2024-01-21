'use client';
import { ReactNode, useEffect } from 'react';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/button/FlotButton';
import Header from '@/components/layout/Header';
import FetchIndicator from '@/components/layout/FetchIndicator';
import Loading from '@/components/layout/Loading';
import { gtag } from '@/utils/gtag';
import Pip from '@/components/common/player/Pip';

interface ServiceLayoutProps {
  children: ReactNode;
}

const ServiceLayout = ({ children }: ServiceLayoutProps) => {
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
      <Pip />
    </>
  );
};

export default ServiceLayout;

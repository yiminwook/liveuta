'use client';
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/button/FlotButton';
import { ToastContainer } from 'react-toastify';
import { PublicConfiguration } from 'swr/_internal';
import Header from '@/components/layout/Header';

interface ServiceLayoutProps {
  children: ReactNode;
}

const SWR_CONFIG_OPTIONS: Partial<PublicConfiguration> = {
  dedupingInterval: 30 * 1000,
  errorRetryCount: 3,
  errorRetryInterval: 5 * 1000,
};

const ServiceLayout = ({ children }: ServiceLayoutProps) => {
  return (
    <>
      <SWRConfig value={SWR_CONFIG_OPTIONS}>
        <Header />
        <main id="app">{children}</main>
        <Footer />
        <FloatButton />
      </SWRConfig>
      <ToastContainer position="bottom-center" autoClose={1000} />
    </>
  );
};

export default ServiceLayout;

/* eslint-disable react/jsx-props-no-spreading */
'use client';
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/FlotButton';
import { ToastContainer } from 'react-toastify';
import PageHead from '@/components/layout/PageHead';
import { PublicConfiguration } from 'swr/_internal';

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const SWR_CONFIG_OPTIONS: Partial<PublicConfiguration> = {
  dedupingInterval: 30 * 1000,
  errorRetryCount: 3,
  errorRetryInterval: 5 * 1000,
};

const ServiceLayout = ({ title = 'Live Uta', children }: ServiceLayoutProps) => {
  return (
    <>
      <PageHead />
      <Header />
      <SWRConfig value={SWR_CONFIG_OPTIONS}>
        <main className="app">{children}</main>
        <Footer />
        <FloatButton />
      </SWRConfig>
      <ToastContainer position="bottom-center" autoClose={1000} />
    </>
  );
};

export default ServiceLayout;

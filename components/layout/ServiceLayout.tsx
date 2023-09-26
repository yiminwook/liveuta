'use client';
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/button/FlotButton';
import { ToastContainer } from 'react-toastify';
import { PublicConfiguration } from 'swr/_internal';
import Header from '@/components/layout/Header';
import ThemeProvider from '@/configs/ThemeProvider';
import isTop from '@/hooks/useIsTop';

interface ServiceLayoutProps {
  initialTheme: string | undefined;
  children: ReactNode;
}

const SWR_CONFIG_OPTIONS: Partial<PublicConfiguration> = {
  dedupingInterval: 1000 * 60 * 3,
  refreshInterval: 1000 * 60 * 3,
  errorRetryCount: 3,
  errorRetryInterval: 5 * 1000,
  revalidateOnReconnect: true,
  revalidateOnFocus: true,
};

const ServiceLayout = ({ initialTheme: theme, children }: ServiceLayoutProps) => {
  return (
    <>
      <SWRConfig value={SWR_CONFIG_OPTIONS}>
        <ThemeProvider initialTheme={theme}>
          <Header />
          <main id="app">{children}</main>
          <Footer />
          {!isTop() && <FloatButton />}
        </ThemeProvider>
      </SWRConfig>
      <ToastContainer position="bottom-center" autoClose={1000} />
    </>
  );
};

export default ServiceLayout;

'use client';

import { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/button/FlotButton';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/layout/Header';
import ThemeProvider from '@/configs/ThemeProvider';
import SWRProvider from '@/configs/SWRProvider';
import JotaiProvider from '@/configs/JotaiProvider';
import Devtools from '@/configs/Devtools';
import ServiceWorker from '@/configs/ServiceWorker';

interface ServiceLayoutProps {
  initialTheme: string | undefined;
  children: ReactNode;
}

const ServiceLayout = ({ initialTheme: theme, children }: ServiceLayoutProps) => {
  return (
    <JotaiProvider>
      <SWRProvider>
        <ThemeProvider initialTheme={theme}>
          <ServiceWorker />
          <Header />
          <main id="app">{children}</main>
          <Footer />
          <FloatButton />
          <Devtools />
          <ToastContainer position="bottom-center" autoClose={1000} />
        </ThemeProvider>
      </SWRProvider>
    </JotaiProvider>
  );
};

export default ServiceLayout;

'use client';
import { ReactNode } from 'react';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/button/FlotButton';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/layout/Header';

interface ServiceLayoutProps {
  children: ReactNode;
}

const ServiceLayout = ({ children }: ServiceLayoutProps) => {
  return (
    <>
      <Header />
      <main id="app">{children}</main>
      <Footer />
      <FloatButton />
      <ToastContainer position="bottom-center" autoClose={1000} />
    </>
  );
};

export default ServiceLayout;

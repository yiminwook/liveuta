/* eslint-disable react/jsx-props-no-spreading */
'use client';
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatButton from '@/components/common/FlotButton';
import { ToastContainer } from 'react-toastify';

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const ServiceLayout = ({ title = 'Live Uta', children }: ServiceLayoutProps) => {
  return (
    <>
      <Header />
      <main className="app">{children}</main>
      <Footer />
      <FloatButton />
      <ToastContainer position="bottom-center" autoClose={1000} />
    </>
  );
};

export default ServiceLayout;

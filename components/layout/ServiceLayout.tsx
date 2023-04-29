/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import Head from 'next/head';
import GNB from '@/components/layout/GNB';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import getConfig from 'next/config';
import Footer from '@/components/layout/Footer';

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const {
  publicRuntimeConfig: { META_IMAGE },
} = getConfig();

const ServiceLayout = ({ title = 'Live Uta', children }: ServiceLayoutProps) => {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <GNB />
      <main className="app">{children}</main>
      <Footer />
      <button className="foat" onClick={scrollUp} onTouchEnd={scrollUp} onTouchStart={scrollUp}>
        <TfiArrowCircleUp size={'3rem'} color={'inherit'} />
      </button>
    </>
  );
};

export default ServiceLayout;

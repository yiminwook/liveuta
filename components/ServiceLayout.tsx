/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import Head from 'next/head';
import GNB from '@/components/header/GNB';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import getConfig from 'next/config';
import home from '@/styles/home/home.module.scss';

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const {
  publicRuntimeConfig: { META_IMAGE },
} = getConfig();

const ServiceLayout = ({
  title = 'LiveUta',
  discription = 'Show V-Tuber Utawaku schedule',
  children,
}: ServiceLayoutProps) => {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Live Uta" />
        <meta name="twitter:site" content="Live Uta" />
        <meta name="twitter:title" content="Live Uta" />
        <meta property="og:description" content={discription} />
        <meta name="description" content={discription} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image" content={META_IMAGE} />
        <meta name="twitter:image" content={META_IMAGE} />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
      </Head>
      <GNB />
      <div className={home['app']}>{children}</div>
      <button className={home['foat']} onClick={scrollUp} onTouchEnd={scrollUp} onTouchStart={scrollUp}>
        <TfiArrowCircleUp size={'3rem'} color={'inherit'} />
      </button>
    </>
  );
};

export default ServiceLayout;

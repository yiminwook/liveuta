/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import Head from 'next/head';
import GNB from './header/GNB';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import Loading from './loading';
import useUpcommingData from '@/hooks/useUpcommingData';
import getConfig from 'next/config';
import home from '@/styles/Home.module.scss';
import useAllData from '@/hooks/useAllData';

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const { publicRuntimeConfig } = getConfig();

const ServiceLayout = ({
  title = 'LiveUta',
  discription = 'Show V-Tuber Utawaku schedule',
  children,
}: ServiceLayoutProps) => {
  const { isLoading: upcomingDataLoading } = useUpcommingData();
  const { isLoading: allDataLoading } = useAllData();
  const metaImg = publicRuntimeConfig.meta_img;

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
        <meta property="og:image" content={metaImg} />
        <meta name="twitter:image" content={metaImg} />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
      </Head>
      <GNB />
      {upcomingDataLoading || allDataLoading ? <Loading /> : null}
      <div className={home['app']}>{children}</div>
      <button className={home['foat']} onClick={scrollUp} onTouchEnd={scrollUp} onTouchStart={scrollUp}>
        <TfiArrowCircleUp size={'3rem'} color={'inherit'} />
      </button>
    </>
  );
};

export default ServiceLayout;

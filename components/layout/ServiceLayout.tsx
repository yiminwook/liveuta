/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import Footer from '@/components/layout/Footer';
import PageHead from '@/components/layout/PageHead';

interface ServiceLayoutProps {
  title?: string;
  discription?: string;
  children: ReactNode;
}

const ServiceLayout = ({ title = 'Live Uta', children }: ServiceLayoutProps) => {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PageHead />
      <Header />
      <main className="app">{children}</main>
      <Footer />
      <button className="foat" onClick={scrollUp} onTouchEnd={scrollUp} onTouchStart={scrollUp}>
        <TfiArrowCircleUp size={'3rem'} color={'inherit'} />
      </button>
    </>
  );
};

export default ServiceLayout;

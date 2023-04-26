import '@/styles/globals.scss';
import ServiceLayout from '@/components/layout/ServiceLayout';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="background-left" />
      <div className="background-right" />
      <ServiceLayout title="LiveUta Home">
        <Component {...pageProps} />
      </ServiceLayout>
      <Analytics />
    </>
  );
};

export default App;

import '@/styles/globals.scss';
import ServiceLayout from '@/components/service_layout';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="background-left" />
      <div className="background-right" />
      <div className="backdrop" />
      <ServiceLayout title="LiveUta Home">
        <Component {...pageProps} />
      </ServiceLayout>
      <Analytics />
    </>
  );
};

export default App;

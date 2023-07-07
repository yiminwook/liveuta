import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import ServiceLayout from '@/components/layout/ServiceLayout';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="background-left" />
      <div className="background-right" />
      <ServiceLayout title="LiveUta Home">
        <Component {...pageProps} />
      </ServiceLayout>
    </>
  );
};

export default App;

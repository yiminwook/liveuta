import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import ServiceLayout from '@/components/layout/ServiceLayout';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div className="background-left" />
      <div className="background-right" />
      <ServiceLayout title="LiveUta Home">
        <Component {...pageProps} />
      </ServiceLayout>
      <ToastContainer position="bottom-center" autoClose={1000} />
    </>
  );
};

export default App;

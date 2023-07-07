import Analytics from '@/components/layout/Analytics';
import PageHead from '@/components/layout/PageHead';
import { PropsWithChildren } from 'react';
import ServiceLayout from '@/components/layout/ServiceLayout';
import '@/styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <PageHead />
      {/* Google Analytics */}
      <Analytics />
      <body>
        <div className="background-left" />
        <div className="background-right" />
        <ServiceLayout title="LiveUta Home">{children}</ServiceLayout>
      </body>
    </html>
  );
};

export default RootLayout;

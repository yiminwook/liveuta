import Analytics from '@/components/layout/Analytics';
import PageHead from '@/components/layout/PageHead';
import { PropsWithChildren } from 'react';
import ServiceLayout from '@/components/layout/ServiceLayout';
import { PAGE_REVALIDATE_TIME } from '@/consts';
import '@/styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import 'pretendard/dist/web/variable/pretendardvariable.css';
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

/** Default Route Segment Config */
export const revalidate = PAGE_REVALIDATE_TIME;
export const dynamicParams = false; //fallback

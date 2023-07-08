import { PropsWithChildren } from 'react';
import ServiceLayout from '@/components/layout/ServiceLayout';
import { PAGE_REVALIDATE_TIME } from '@/consts';
import '@/styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/globals.scss';
import { DEFALUT_METADATA } from '@/consts/metaData';
import DefaultHead from '@/components/layout/DefaultHead';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <DefaultHead />
      <body>
        <ServiceLayout>{children}</ServiceLayout>
        <div className="background-left" />
        <div className="background-right" />
      </body>
    </html>
  );
};

export default RootLayout;

/** Default Route Segment Config */
export const revalidate = PAGE_REVALIDATE_TIME;
export const dynamicParams = true; //fallback
export const preferredRegion = ['icn1'];
export const metadata = DEFALUT_METADATA;

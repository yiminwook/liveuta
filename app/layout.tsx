import 'react-toastify/dist/ReactToastify.css';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import { PropsWithChildren } from 'react';
import ServiceLayout from '@/components/layout/ServiceLayout';
import { PAGE_REVALIDATE_TIME } from '@/consts';
import { cookies } from 'next/headers';
import { DEFALUT_METADATA } from '@/consts/metaData';
import DefaultHead from '@/configs/DefaultHead';

interface CookieType {
  theme: string | undefined;
}

const getCookie = () => {
  const cookie: CookieType = { theme: 'theme1' };
  cookie.theme = cookies().get('theme')?.value;

  return cookie;
};

const RootLayout = ({ children }: PropsWithChildren) => {
  const cookie = getCookie();

  return (
    <html lang="ko" suppressHydrationWarning={true} color={cookie.theme}>
      <DefaultHead />
      <body>
        <ServiceLayout initialTheme={cookie.theme}>{children}</ServiceLayout>
        <div className="background-left" />
        <div className="background-right" />
        <div id="modal-root" />
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

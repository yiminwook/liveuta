import 'react-toastify/dist/ReactToastify.css';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import { PropsWithChildren } from 'react';
import ServiceLayout from '@/components/layout/ServiceLayout';
import { PAGE_REVALIDATE_TIME } from '@/consts';
import { DEFALUT_METADATA } from '@/consts/metaData';
import DefaultHead from '@/configs/DefaultHead';
import Configs from '@/configs';
import { getCookies } from '@/utils/getCookie';

const RootLayout = async ({ children }: PropsWithChildren) => {
  const cookies = await getCookies();

  return (
    <html lang="ko" color={cookies.theme}>
      <DefaultHead />
      <body>
        <Configs cookies={cookies}>
          <ServiceLayout>{children}</ServiceLayout>
        </Configs>
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

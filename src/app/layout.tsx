// css 순서변경 금지
// import '@/styles/reset.css';

import '@/styles/swiper/core.scss';
import '@/styles/swiper/pagination.scss';
import 'swiper/css/free-mode';
import 'swiper/css/grid';

import '@/styles/mantine/core.scss';
import '@/styles/mantine/theme.scss';
import '/public/theme-v2.css';
import '@/styles/global.scss';
import '@/styles/globalTheme.css';

import Configs from '@/components/config';
import DefaultHead from '@/components/config/DefaultHead';
import GoogleTagManager from '@/components/config/GoogleTagManager';
import { DEFALUT_METADATA } from '@/constants/metaData';
import { getCookies } from '@/utils/getCookie';
import type { Metadata, Viewport } from 'next';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookies = await getCookies();

  return (
    <html lang="ko" color={cookies.theme}>
      <head>
        <DefaultHead />
      </head>
      <body>
        <Configs cookies={cookies}>{children}</Configs>
        <GoogleTagManager />
      </body>
    </html>
  );
}

/** Default Route Segment Config */
export const dynamicParams = true; //fallback
export const preferredRegion = ['icn1'];
export const metadata: Metadata = DEFALUT_METADATA;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};

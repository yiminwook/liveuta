// css 순서변경 금지
// import '@/styles/reset.css';

import 'overlayscrollbars/overlayscrollbars.css';
import '@/styles/swiper/core.scss';
import 'swiper/css/free-mode';
import 'swiper/css/grid';

import '@/styles/mantine/core.scss';
import '@/styles/mantine/theme.scss';
import '/public/theme-v2.css';
import '@/styles/global.scss';
import '@/styles/globalTheme.css';

import GlobalScrollbar from '@/components/common/OverlayScrollbar';
import Configs from '@/components/config';
import DefaultHead from '@/components/config/DefaultHead';
import GoogleTagManager from '@/components/config/GoogleTagManager';
import { DEFALUT_METADATA } from '@/constants/metaData';
import { getCookies } from '@/utils/getCookie';
import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookies = await getCookies();

  return (
    <ViewTransitions>
      <html lang="ko" color={cookies.theme} data-overlayscrollbars-initialize>
        <head>
          <DefaultHead />
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/overlayscrollbars/2.10.1/browser/overlayscrollbars.browser.es6.min.js" />
        </head>
        <body data-overlayscrollbars-initialize>
          <Configs cookies={cookies}>{children}</Configs>
          <GoogleTagManager />
          <GlobalScrollbar />
        </body>
      </html>
    </ViewTransitions>
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

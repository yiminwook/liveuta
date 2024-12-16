// css 순서변경 금지
// import '@/styles/reset.css';

import 'overlayscrollbars/overlayscrollbars.css';
import '@/styles/swiper/core.scss';
import '@/styles/swiper/pagination.scss';
import 'swiper/css/free-mode';
import 'swiper/css/grid';

import '@/styles/mantine/core.scss';
import '@/styles/mantine/theme.scss';
import '/public/theme-v2.css';
import '@/styles/global.scss';

import Configs from '@/components/config';
import DefaultHead from '@/components/config/DefaultHead';
import GlobalScrollbar from '@/components/config/GlobalScrollbar';
import GoogleTagManager from '@/components/config/GoogleTagManager';
import { DEFAULT_METADATA } from '@/constants/metaData';
import { getCookies } from '@/utils/getCookie';
import { isDarkModeEnabled } from '@/utils/helper';
import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookies = await getCookies();
  const isDarkMode = isDarkModeEnabled(cookies.theme);
  const colorScheme = isDarkMode ? 'dark' : 'light';
  const { device, browser } = userAgent({ headers: await headers() });
  const isMobile = device.type === 'mobile';

  console.log(browser);
  console.log(device);

  return (
    <ViewTransitions>
      <html
        lang="ko"
        color={cookies.theme}
        data-overlayscrollbars-initialize={!isMobile}
        data-mantine-color-scheme={colorScheme} // mantine-theme-ssr
      >
        <head>
          <DefaultHead />
        </head>
        <body data-overlayscrollbars-initialize={!isMobile}>
          <Configs cookies={cookies} colorScheme={colorScheme}>
            {children}
          </Configs>
          <GoogleTagManager />
          <GlobalScrollbar disable={isMobile} />
        </body>
      </html>
    </ViewTransitions>
  );
}

/** Default Route Segment Config */
export const dynamicParams = true; //fallback
export const preferredRegion = ['icn1'];
export const metadata: Metadata = DEFAULT_METADATA;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};

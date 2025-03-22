// css 순서변경 금지
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
import ThemeScript from '@/components/config/ThemeScript';
import { DEFAULT_METADATA } from '@/constants/metaData';
import { getCookies } from '@/utils/getCookie';
import { Metadata, Viewport } from 'next';
import { getLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import type { ReactNode } from 'react';

import MswProvider from '@/mocks/MswProvider';
import '@/mocks/enableServer';

type Props = {
  children?: ReactNode;
};

export default async function Layout({ children }: Props) {
  const [cookies, header, locale] = await Promise.all([getCookies(), headers(), getLocale()]);
  const { os } = userAgent({ headers: header });
  const isIos = os.name === 'iOS' || os.name === 'iPadOS';
  const overlayScrollbarInitialize = {
    'data-overlayscrollbars-initialize': true,
  };

  return (
    <html
      lang={locale}
      {...(isIos ? {} : overlayScrollbarInitialize)}
      // color={cookies.theme}
      // data-mantine-color-scheme={colorScheme} // mantine-theme-ssr
      suppressHydrationWarning
    >
      <head>
        <DefaultHead />
      </head>
      <body {...(isIos ? {} : overlayScrollbarInitialize)}>
        <MswProvider>
          <Configs cookies={cookies} locale={locale}>
            {children}
          </Configs>
        </MswProvider>
        <GoogleTagManager />
        {!isIos && <GlobalScrollbar />}
        <ThemeScript />
      </body>
    </html>
  );
}

/** Default Route Segment Config */
export const dynamicParams = true; //fallback: 'blocking'
export const preferredRegion = ['icn1'];
export const metadata: Metadata = DEFAULT_METADATA;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};

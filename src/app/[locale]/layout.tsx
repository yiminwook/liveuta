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
import { routing } from '@/i18n/routing';
import { getCookies } from '@/utils/getCookie';
import { isDarkModeEnabled } from '@/utils/helper';
import type { Metadata, Viewport } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { userAgent } from 'next/server';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);

  const cookies = await getCookies();
  const isDarkMode = isDarkModeEnabled(cookies.theme);
  const colorScheme = isDarkMode ? 'dark' : 'light';
  const { os } = userAgent({ headers: await headers() });
  const isIos = os.name === 'iOS' || os.name === 'iPadOS';
  const overlayScrollbarInitialize = {
    'data-overlayscrollbars-initialize': true,
  };

  return (
    <html
      lang={locale}
      color={cookies.theme}
      {...(isIos ? {} : overlayScrollbarInitialize)}
      data-mantine-color-scheme={colorScheme} // mantine-theme-ssr
    >
      <head>
        <DefaultHead />
      </head>
      <body {...(isIos ? {} : overlayScrollbarInitialize)}>
        <Configs cookies={cookies} colorScheme={colorScheme}>
          {children}
        </Configs>
        <GoogleTagManager />
        {!isIos && <GlobalScrollbar />}
      </body>
    </html>
  );
}

/** Default Route Segment Config */
export const dynamicParams = false; //fallback: 'blocking' BUG!! 404 이동이 안됨.
export const preferredRegion = ['icn1'];
export const metadata: Metadata = DEFAULT_METADATA;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};

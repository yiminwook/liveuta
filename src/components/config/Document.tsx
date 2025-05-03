/* eslint-disable @next/next/no-head-element */
import { getCookies } from '@/apis/cached';
import { TLocaleCode } from '@/libraries/i18n/type';
import MswProvider from '@/mocks/msw-provider';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { ReactNode } from 'react';
import Configs from '.';
import DefaultHead from './DefaultHead';
import GlobalScrollbar from './GlobalScrollbar';
import GoogleTagManager from './GoogleTagManager';
import ThemeScript from './ThemeScript';

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

import '@/mocks/enable-server';

type Props = {
  children: ReactNode;
  locale: TLocaleCode;
};

export default async function Document({ children, locale }: Props) {
  const [cookies, header] = await Promise.all([getCookies(), headers()]);
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
        <ThemeScript />
      </head>
      <body {...(isIos ? {} : overlayScrollbarInitialize)}>
        <MswProvider>
          <Configs cookies={cookies} locale={locale}>
            {children}
          </Configs>
        </MswProvider>
        <GoogleTagManager />
        {!isIos && <GlobalScrollbar />}
      </body>
    </html>
  );
}

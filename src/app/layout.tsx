// css 순서변경 금지
import './reset.css';
import * as styles from '@/app/global.css';
import '@/styles/globalTheme.css';

import { PropsWithChildren } from 'react';
import { DEFALUT_METADATA } from '@/constants/metaData';
import { getCookies } from '@/utils/getCookie';
import type { Metadata, Viewport } from 'next';
import Configs from '@/components/config';
import DefaultHead from '@/components/config/DefaultHead';
import GoogleTagManager from '@/components/config/GoogleTagManager';

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookies = await getCookies();

  return (
    <html lang="ko" color={cookies.theme}>
      <head>
        <DefaultHead />
      </head>
      <body className={styles.body}>
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

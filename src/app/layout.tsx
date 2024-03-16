// css 순서변경 금지
import './reset.css';
import * as styles from '@/app/global.css';

import { PropsWithChildren } from 'react';
import { DEFALUT_METADATA } from '@/const/metaData';
import { getCookies } from '@inner/_lib/getCookie';
import type { Metadata, Viewport } from 'next';
import Configs from './_component';
import DefaultHead from './_component/DefaultHead';
import GoogleTagManager from './_component/GoogleTagManager';
import GlobalLoading from './loading';

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookies = await getCookies();

  return (
    <html lang="ko">
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

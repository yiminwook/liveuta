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

import { DEFAULT_METADATA } from '@/constants/metaData';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}

/** Default Route Segment Config */
export const preferredRegion = ['icn1'];
export const metadata: Metadata = DEFAULT_METADATA;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};

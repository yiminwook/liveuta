import { DEFAULT_METADATA } from '@/constants/meta-data';
import { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default async function Layout({ children }: Props) {
  return <>{children}</>;
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

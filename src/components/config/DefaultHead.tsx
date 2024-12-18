import { DEFAULT_ICON, DEFAULT_SITE_URL } from '@/constants/metaData';
import Script from 'next/script';
import GoogleAnalytics from './GoogleAnalytics';

export default function DefaultHead() {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  return (
    <>
      <GoogleAnalytics />
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href={DEFAULT_ICON} />
      <link rel="apple-touch-icon" href={DEFAULT_ICON} />
      <link rel="assets" href={`${DEFAULT_SITE_URL}/assets`} />
      {!isProduction && <Script src="https://unpkg.com/react-scan/dist/auto.global.js" async />}
    </>
  );
}

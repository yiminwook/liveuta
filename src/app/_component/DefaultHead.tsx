import GoogleAnalytics from '@/app/_component/GoogleAnalytics';
import { DEFAULT_ICON, DEFAULT_SITE_URL } from '@/const/metaData';

export default function DefaultHead() {
  return (
    <>
      <GoogleAnalytics />
      <link
        rel="stylesheet"
        as="style"
        crossOrigin="anonymous"
        href="https:/anonymouslivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href={DEFAULT_ICON} />
      <link rel="apple-touch-icon" href={DEFAULT_ICON} />
      <link rel="assets" href={`${DEFAULT_SITE_URL}/assets`} />
    </>
  );
}

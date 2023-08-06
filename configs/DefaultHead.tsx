import Analytics from '@/configs/Analytics';
import { DEFAULT_ICON, DEFAULT_SITE_URL } from '@/consts/metaData';
import Script from 'next/script';
const DefaultHead = () => {
  return (
    <>
      {/* Google Analytics */}
      <Analytics />
      {/* <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.6.10/lottie.min.js"
        integrity="sha512-QGaslwkb2XoQM7dTYUB8YucbFcUC+Mhm/xTkz+pXNv0Dm9aZSj1Js7OwXrXa1OrMJUpSi2Bj21srh8mwsFNKTQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></Script> */}
      <link rel="preload" href={`${DEFAULT_SITE_URL}/api/sheet`} as="fetch" crossOrigin="anonymous"></link>
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href={DEFAULT_ICON} />
      <link rel="apple-touch-icon" href={DEFAULT_ICON} />
      <link rel="assets" href={`${DEFAULT_SITE_URL}/assets`} />
    </>
  );
};

export default DefaultHead;

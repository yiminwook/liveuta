import Analytics from '@/components/layout/Analytics';
import { DEFAULT_ICON, DEFAULT_SITE_URL } from '@/consts/metaData';
const DefaultHead = () => {
  return (
    <>
      {/* Google Analytics */}
      <Analytics />
      <link rel="preload" href={`${DEFAULT_SITE_URL}/api/sheet`} as="fetch" crossOrigin="anonymous"></link>
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href={DEFAULT_ICON} />
      <link rel="apple-touch-icon" href={DEFAULT_ICON} />
      <link rel="assets" href={`${DEFAULT_SITE_URL}/assets`} />
    </>
  );
};

export default DefaultHead;

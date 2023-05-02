import { SITE_URL } from '@/consts';
import getENV from '@/utils/getENV';
import Head from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT_TITLE = 'Live Uta';
const DEFAULT_DESC = 'Show V-Tuber Utawaku schedule';
const DEFAULT_KEYWORD = 'Next.js, Blog, tw';
const DEFAULT_IMAGE = `/api/og?title=${DEFAULT_TITLE}`;

interface PagePHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const PageHead = ({ title, description, image, keywords }: PagePHeadProps) => {
  const { asPath } = useRouter();
  const siteURL = process.env.SITE_URL;
  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const pageDesc = description ?? DEFAULT_DESC;
  const pageKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORD}` : DEFAULT_KEYWORD;
  const pageImage = image ?? `${siteURL}${image ?? DEFAULT_IMAGE}`;
  const pageURL = `${siteURL}${asPath}`;

  return (
    <Head>
      {/* OG */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:desciption" content={pageDesc} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image:alt" content={pageTitle} />
      {/* twitter */}
      <meta property="twitter:card" content={pageDesc} />
      <meta property="twitter:site" content={pageDesc} />
      <meta property="twitter:creator" content={pageDesc} />
      <meta property="twitter:description" content={pageDesc} />
      {/* mobile */}
      <meta name="application-name" content="Live Uta" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/* apple */}
      <meta name="apple-mobile-web-app-title" content="Live Uta" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="apple-touch-icon" href="/assets/icon-192-192.png" />
      {/* default */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1" />
      <meta name="theme-color" content="#d8aab1ec" />
      {/* 컨텐츠 중복방지 */}
      <link rel="canonical" href={pageURL} />
      <link rel="shortcut icon" href="/assets/icon-192-192.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="assets" href="/assets" />
      <link
        rel="icon"
        href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
      />
    </Head>
  );
};

export default PageHead;

import { HOST, PROTOCOL } from '@/consts';
import getENV from '@/utils/getENV';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  const protocol = getENV(PROTOCOL);
  const host = getENV(HOST);
  const metaImageURL = `${protocol}://${host}/api/assets/meta-image`;
  return (
    <Html lang="ko">
      <Head>
        {/* OG */}
        <meta property="og:title" content="Live Uta" />
        <meta property="og:image" content={metaImageURL} />
        <meta property="og:description" content="Show V-Tuber Utawaku schedule" />
        {/* Twitter */}
        <meta name="twitter:site" content="Live Uta" />
        <meta name="twitter:title" content="Live Uta" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={metaImageURL} />
        {/* mobile */}
        <meta name="application-name" content="Live Uta" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* apple */}
        <meta name="apple-mobile-web-app-title" content="Live Uta" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/assets/icon-192-192.png" />
        {/* basic */}
        <meta name="description" content="Show V-Tuber Utawaku schedule" />
        <meta name="theme-color" content="#d8aab1ec" />
        <link
          rel="icon"
          href="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png"
        />
        <link rel="shortcut icon" href="/assets/icon-192-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="assets" href="/assets" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

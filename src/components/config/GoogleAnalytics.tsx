/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';
import { GA_TRACKING_ID, GTM_TRACKING_ID } from '@/constants';

/**
 * @document - https://tagmanager.google.com/?authuser=1#/home?tab=tags
 */
export default function GoogleAnalytics() {
  return (
    <>
      {/* <!-- Google Tag Manager --> */}
      <Script id="google-tagmanager" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${GTM_TRACKING_ID}');
        `}
      </Script>
      {/* <!-- End Google Tag Manager --> */}
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
}

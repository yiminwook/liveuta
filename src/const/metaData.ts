import { Metadata } from 'next';

export const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const DEFAULT_TITLE = 'Live Uta';
export const DEFAULT_DESC = 'Show V-Tuber Utawaku schedule';
// export const DEFAULT_COLOR = '#d8aab1ec';
export const DEFAULT_ICON = `${DEFAULT_SITE_URL}/assets/icon-192-192.png`;
export const DEFAULT_IMAGE = {
  url: `${DEFAULT_SITE_URL}/assets/meta-image.png`,
  width: 1200,
  height: 627,
  alt: 'v-singer 일정조회 사이트 LiveUta입니다.',
  type: 'image/png',
};

export const DEFALUT_METADATA: Metadata = {
  metadataBase: new URL(DEFAULT_SITE_URL),
  alternates: {
    canonical: DEFAULT_SITE_URL, //컨텐츠 중복방지
  },
  title: DEFAULT_TITLE,
  description: DEFAULT_DESC,
  manifest: `${DEFAULT_SITE_URL}/manifest.json`,
  icons:
    'https://img.icons8.com/external-microdots-premium-microdot-graphic/64/null/external-holiday-christmas-new-year-vol2-microdots-premium-microdot-graphic-4.png',
  // themeColor: DEFAULT_COLOR,
  applicationName: 'Live Uta',
  appleWebApp: {
    title: DEFAULT_TITLE,
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: DEFAULT_SITE_URL,
    siteName: DEFAULT_DESC,
    locale: 'ko_KR',
    type: 'website',
    images: {
      ...DEFAULT_IMAGE,
    },
  },
  twitter: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: {
      ...DEFAULT_IMAGE,
    },
    card: 'summary',
  },
};

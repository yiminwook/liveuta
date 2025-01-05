import Configs from '@/components/config';
import DefaultHead from '@/components/config/DefaultHead';
import GlobalScrollbar from '@/components/config/GlobalScrollbar';
import GoogleTagManager from '@/components/config/GoogleTagManager';
import { routing } from '@/i18n/routing';
import { getCookies } from '@/utils/getCookie';
import { isDarkModeEnabled } from '@/utils/helper';
import { setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { userAgent } from 'next/server';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);

  const cookies = await getCookies();
  const isDarkMode = isDarkModeEnabled(cookies.theme);
  const colorScheme = isDarkMode ? 'dark' : 'light';
  const { os } = userAgent({ headers: await headers() });
  const isIos = os.name === 'iOS' || os.name === 'iPadOS';
  const overlayScrollbarInitialize = {
    'data-overlayscrollbars-initialize': true,
  };

  return (
    <html
      lang={locale}
      color={cookies.theme}
      {...(isIos ? {} : overlayScrollbarInitialize)}
      data-mantine-color-scheme={colorScheme} // mantine-theme-ssr
    >
      <head>
        <DefaultHead />
      </head>
      <body {...(isIos ? {} : overlayScrollbarInitialize)}>
        <Configs cookies={cookies} colorScheme={colorScheme}>
          {children}
        </Configs>
        <GoogleTagManager />
        {!isIos && <GlobalScrollbar />}
      </body>
    </html>
  );
}

export const dynamicParams = true; //fallback: 'blocking'

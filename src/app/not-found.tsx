import DefaultHead from '@/components/config/DefaultHead';
import { siteConfig } from '@/siteConfig';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Client from './not-found.client';

export const metadata: Metadata = {
  title: '404: Not Found',
};

export default async function NotFound() {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value;

  return (
    <html>
      <head>
        <DefaultHead />
      </head>
      <body>
        <Client locale={locale !== undefined ? locale : siteConfig.defaultLocale} />
      </body>
    </html>
  );
}

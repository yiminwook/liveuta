import { FALLBACK_LANG } from '@/libraries/i18n/config';
import { TLocaleCode } from '@/libraries/i18n/type';
import type { Metadata } from 'next';
import Client from './not-found.client';

export const metadata: Metadata = {
  title: '404: Not Found',
};

type Props = {
  params: Promise<{
    locale: TLocaleCode;
  }>;
};

export default async function NotFound(props: Props) {
  const params = await props.params;

  return <Client />;
}

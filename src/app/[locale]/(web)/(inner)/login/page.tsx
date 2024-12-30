import Home from '@/components/login/Home';
import { redirect } from '@/i18n/routing';
import { auth } from '@/libraries/nextAuth';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: '로그인 | Live Uta',
};

export default async function Page() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);

  if (session) {
    redirect({ href: '/', locale: locale });
  }

  return <Home />;
}

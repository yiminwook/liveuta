import Home from '@/components/my/Home';
import { redirect } from '@/i18n/routing';
import { auth } from '@/libraries/nextAuth';
import { getLocale } from 'next-intl/server';

export default async function Page() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);

  if (!session) {
    redirect({ href: '/login', locale: locale });
    return;
  }

  return <Home session={session} />;
}

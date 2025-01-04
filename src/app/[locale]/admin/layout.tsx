import { redirect } from '@/i18n/routing';
import { auth } from '@/libraries/nextAuth';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { forbidden, unauthorized } from 'next/navigation';
import Client from './layout.client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect({ href: '/login', locale: 'ko' });
    return;
  }

  // userLv
  // 1 - Memember
  // 2 - VIP Memember
  if (session.user.userLv < 3) {
    // 3 - Admin
    // 4 - Collaborator
    // 5 - Maintenance
    unauthorized();
  }

  setRequestLocale('ko');

  return <Client>{children}</Client>;
}

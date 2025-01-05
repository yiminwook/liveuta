import { auth } from '@/libraries/nextAuth';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Client from './layout.client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    notFound();
  }

  // userLv
  // 1 - Memember
  // 2 - VIP Memember
  if (session.user.userLv < 3) {
    // 3 - Admin
    // 4 - Collaborator
    // 5 - Maintenance
    notFound();
  }

  setRequestLocale('ko');

  return <Client>{children}</Client>;
}

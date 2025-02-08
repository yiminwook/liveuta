import Administrator from '@/components/config/Administrator';
import Authorized from '@/components/config/Authorized';
import { setRequestLocale } from 'next-intl/server';
import Client from './layout.client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  setRequestLocale('ko');

  return (
    <Authorized>
      <Administrator>
        <Client>{children}</Client>
      </Administrator>
    </Authorized>
  );
}

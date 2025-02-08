import UnAuthorized from '@/components/config/UnAuthorized';
import Home from '@/components/login/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인 | Live Uta',
};

export default async function Page() {
  return (
    <UnAuthorized>
      <Home />
    </UnAuthorized>
  );
}

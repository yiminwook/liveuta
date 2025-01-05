import Home from '@/components/login/Home';
import { auth } from '@/libraries/nextAuth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '로그인 | Live Uta',
};

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <Home />;
}

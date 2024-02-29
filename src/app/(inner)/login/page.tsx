import Home from './_component/Home';
import { redirect } from 'next/navigation';
import { auth } from '@/model/nextAuth';
import { Metadata } from 'next';

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

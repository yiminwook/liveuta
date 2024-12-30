import { auth } from '@/libraries/nextAuth';
import { redirect } from 'next/navigation';
import Client from './page.client';

export default async function Page() {
  const session = await auth();
  console.log('session logout', session);

  if (!session) {
    redirect('/login');
  }

  return <Client />;
}

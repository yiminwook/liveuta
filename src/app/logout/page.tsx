import { redirect } from 'next/navigation';
import Home from '@/components/logout/Home';
import { auth } from '@/libraries/nextAuth';

export default async function Page() {
  const session = await auth();
  console.log('session logout', session);

  if (!session) {
    redirect('/login');
  }

  return <Home />;
}

import { redirect } from 'next/navigation';
import Home from './_component/Home';
import { auth } from '@/model/nextAuth';

export default async function Page() {
  const session = await auth();
  console.log('session logout', session);

  if (!session) {
    redirect('/login');
  }

  return <Home />;
}

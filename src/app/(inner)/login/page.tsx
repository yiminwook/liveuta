import Home from './_component/Home';
import { redirect } from 'next/navigation';
import { auth } from '@/model/nextAuth';

export default async function Page() {
  const session = await auth();
  console.log('session login', session);

  if (session) {
    redirect('/');
  }

  return <Home />;
}

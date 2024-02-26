import { getSessionInServer } from '@/model/google/auth';
import Home from './_component/Home';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getSessionInServer();
  console.log('session login', session);

  if (session) {
    redirect('/');
  }

  return <Home />;
}

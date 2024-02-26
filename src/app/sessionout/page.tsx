import { redirect } from 'next/navigation';
import Home from './_component/Home';
import { getSessionInServer } from '@/model/google/auth';

export default async function Page() {
  const session = await getSessionInServer();
  console.log('session sessionout', session);

  if (!session) {
    redirect('/login');
  }

  return <Home />;
}

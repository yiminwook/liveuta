import Home from './_component/Home';
import { redirect } from 'next/navigation';
import { auth } from '@/model/nextAuth';

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <Home />;
}

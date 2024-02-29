import { auth } from '@/model/nextAuth';
import Home from './_component/Home';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');

  return <Home session={session} />;
}

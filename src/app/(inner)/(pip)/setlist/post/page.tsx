import { auth } from '@/libraries/nextAuth';
import Home from '@/components/setlistPost/Home';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');

  return <Home session={session} />;
}

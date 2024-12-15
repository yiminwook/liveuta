import Home from '@/components/my/Home';
import { auth } from '@/libraries/nextAuth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) redirect('/login');

  return <Home session={session} />;
}

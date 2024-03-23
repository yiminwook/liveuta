import { auth } from '@/model/nextAuth';
import { redirect } from 'next/navigation';
import BlackList from './BlackList';

export default async function Home() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div>
      <h1>블랙리스트 조회</h1>
      <BlackList session={session} />
    </div>
  );
}

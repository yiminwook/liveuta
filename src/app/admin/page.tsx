import { auth } from '@/libraries/nextAuth';
import Client from './page.client';

export default async function Page() {
  const session = await auth();

  return <Client session={session!} />;
}

import { auth } from '@/libararies/nextAuth';
import Home from './_component/Home';

export default async function Page() {
  const session = await auth();
  return <Home session={session} />;
}

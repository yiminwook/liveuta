import { auth } from '@/model/nextAuth';
import Home from '@inner/_component/Home';

export default async function Page() {
  const session = await auth();

  console.log('session home', session);

  return <Home filter="scheduled" />;
}

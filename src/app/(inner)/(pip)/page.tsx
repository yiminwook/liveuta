import { getSessionInServer } from '@/model/google/auth';
import Home from '@inner/_component/Home';

export default async function Page() {
  const session = await getSessionInServer();

  console.log('session home', session);

  return <Home filter="scheduled" />;
}

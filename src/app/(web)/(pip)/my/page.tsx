import Authorized from '@/components/config/Authorized';
import Home from '@/components/my/Home';

export default async function Page() {
  return (
    <Authorized>
      <Home />
    </Authorized>
  );
}

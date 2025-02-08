import Authorized from '@/components/config/Authorized';
import Client from './page.client';

export default async function Page() {
  return (
    <Authorized>
      <Client />
    </Authorized>
  );
}

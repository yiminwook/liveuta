import { auth } from '@/model/nextAuth';
import { redirect } from 'next/navigation';
import * as service from '@inner/_action/blacklist';

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');
  const blacklist = await service.GET({ accessToken: session.user.accessToken });

  return (
    <div>
      <h1>블랙리스트 조회</h1>
      <ul>
        {blacklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

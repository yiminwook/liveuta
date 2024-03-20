import { auth } from '@/model/nextAuth';
import { redirect } from 'next/navigation';
import BlackList from './BlackList';
import { getQueryClient } from '@inner/_lib/getQueryClient';
import getBlackListData from '../_lib/getBlackListData';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const session = await auth();
  if (!session) redirect('/login');

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['blackList'],
    queryFn: () =>
      getBlackListData(session).then((res) => {
        if (!res.result) {
          throw new Error(res.message);
        } else {
          return res.result;
        }
      }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <h1>블랙리스트 조회</h1>
        <BlackList session={session} />
      </div>
    </HydrationBoundary>
  );
}

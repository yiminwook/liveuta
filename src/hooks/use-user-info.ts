import { useQuery } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { clientApi } from '@/apis/fetcher';
import { MEMBER_TAG } from '@/constants/revalidate-tag';
import { TMemberInfo } from '@/libraries/oracledb/auth/service';

export const useUserInfo = (args: { user: User | null }) =>
  useQuery({
    queryKey: [MEMBER_TAG, args.user?.email],
    queryFn: () =>
      clientApi
        .get<{ data: TMemberInfo }>('v1/member')
        .json()
        .then((json) => json.data),
    enabled: !!args.user,
    staleTime: 1000 * 60, // 1분
  });

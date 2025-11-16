import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/apis/fetcher';
import { MEMBER_TAG } from '@/constants/revalidate-tag';
import { TMemberInfo } from '@/libraries/oracledb/auth/service';
import { useSession } from '@/stores/session';

/** 세션 리프레쉬 */
export const useUserInfo = (args: { session: TSession | null }) =>
  useQuery({
    queryKey: [MEMBER_TAG, args.session?.email],
    queryFn: () =>
      clientApi
        .get<{ data: TMemberInfo & TSession }>('v1/member')
        .json()
        .then((json) => {
          useSession.getState().actions.refreshSession({
            session: {
              accessToken: json.data.accessToken,
              expiresAt: json.data.expiresAt,
              email: json.data.email,
            },
          });
          return json.data;
        }),
    enabled: !!args.session,
    staleTime: 1000 * 60, // 1분
  });

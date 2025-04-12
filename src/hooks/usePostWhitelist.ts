import { clientApi } from '@/apis/fetcher';
import { WHITELIST_TAG } from '@/constants/revalidateTag';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { toast } from 'sonner';

export default function usePostWhitelist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ session, channelId }: { session: Session; channelId: string }) => {
      const response = await clientApi
        .post<{ message: string; data: string }>(`v1/whitelist/${channelId}`, {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        })
        .json();
      return response;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      if (queryClient.getQueryData([WHITELIST_TAG])) {
        queryClient.setQueryData([WHITELIST_TAG], (prev: string[]) => {
          return [...prev, res.data];
        });
      }
    },
    onError: () => {
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
      queryClient.invalidateQueries({ queryKey: [WHITELIST_TAG] });
    },
  });

  return mutation;
}

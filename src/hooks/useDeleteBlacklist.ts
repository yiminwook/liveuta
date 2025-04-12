import { clientApi } from '@/apis/fetcher';
import { BLACKLIST_TAG } from '@/constants/revalidateTag';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { toast } from 'sonner';

export default function useDeleteBlacklist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ session, channelId }: { session: Session; channelId: string }) => {
      const json = await clientApi
        .delete<{ message: string; data: string }>(`v1/blacklist/${channelId}`, {
          headers: { Authorization: `Bearer ${session.user.accessToken}` },
        })
        .json();
      return json;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      if (queryClient.getQueryData([BLACKLIST_TAG])) {
        queryClient.setQueryData([BLACKLIST_TAG], (pre: string[]) => {
          return pre.filter((channelId) => channelId !== res.data);
        });
      }
    },
    onError: () => {
      toast.error('서버에 문제가 발생했습니다. 다시 시도해주세요.');
      queryClient.invalidateQueries({ queryKey: [BLACKLIST_TAG] });
    },
  });

  return mutation;
}

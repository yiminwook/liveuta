import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { clientApi } from '@/apis/fetcher';
import { BLACKLIST_TAG } from '@/constants/revalidate-tag';

export default function useDeleteBlacklist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (args: { channelId: string }) =>
      clientApi.delete<{ message: string; data: string }>(`v1/blacklist/${args.channelId}`).json(),
    onSuccess: (res) => {
      if (queryClient.getQueryData([BLACKLIST_TAG])) {
        queryClient.setQueryData([BLACKLIST_TAG], (pre: string[]) => {
          return pre.filter((channelId) => channelId !== res.data);
        });
      }
      toast.success(res.message);
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: [BLACKLIST_TAG] });
      toast.error('서버에 문제가 발생했습니다. 다시 시도해주세요.');
    },
  });

  return mutation;
}

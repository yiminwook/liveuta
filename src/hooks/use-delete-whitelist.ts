import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { clientApi } from '@/apis/fetcher';
import { WHITELIST_TAG } from '@/constants/revalidate-tag';

export default function useMutateWhitelist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { channelId: string }) =>
      clientApi.delete<{ message: string; data: string }>(`v1/whitelist/${args.channelId}`).json(),
    onSuccess: (res) => {
      if (queryClient.getQueryData([WHITELIST_TAG])) {
        queryClient.setQueryData([WHITELIST_TAG], (prev: string[]) => {
          return prev.filter((id) => id !== res.data);
        });
      }

      toast.success(res.message);
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: [WHITELIST_TAG] });
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}

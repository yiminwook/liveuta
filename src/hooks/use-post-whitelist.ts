import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { clientApi } from '@/apis/fetcher';
import { WHITELIST_TAG } from '@/constants/revalidate-tag';

export default function usePostWhitelist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (args: { channelId: string; email: string }) =>
      clientApi.post<{ message: string; data: string }>(`v1/whitelist/${args.channelId}`).json(),
    onSuccess: (res, args) => {
      toast.success(res.message);
      if (queryClient.getQueryData([WHITELIST_TAG, args.email])) {
        queryClient.setQueryData([WHITELIST_TAG, args.email], (prev: string[]) => {
          return [...prev, res.data];
        });
      }
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: [WHITELIST_TAG] });
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    },
  });

  return mutation;
}

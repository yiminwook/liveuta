import { deleteWhitelist } from '@inner/_action/whitelist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useMutateWhitelist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteWhitelist'],
    mutationFn: deleteWhitelist,
    onSuccess: (res) => {
      if (!res.result) {
        toast.error(res.message);
        queryClient.invalidateQueries({ queryKey: ['whitelist'] });
      } else {
        toast.success(res.message);
        if (queryClient.getQueryData(['whitelist'])) {
          queryClient.setQueryData(['whitelist'], (prev: string[]) => {
            return prev.filter((id) => id !== res.result);
          });
        }
      }
    },
    onError: () => {
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}

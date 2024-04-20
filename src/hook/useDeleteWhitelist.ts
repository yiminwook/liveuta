import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { toast } from 'sonner';

export default function useMutateWhitelist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteWhitelist'],
    mutationFn: async ({ session, channelId }: { session: Session; channelId: string }) => {
      const response = await axios.delete<{ message: string; data: string }>(
        `/api/whitelist/${channelId}`,
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } },
      );
      return response.data; //채널 아이디
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message);
        queryClient.invalidateQueries({ queryKey: ['whitelist'] });
      } else {
        toast.success(res.message);
        if (queryClient.getQueryData(['whitelist'])) {
          queryClient.setQueryData(['whitelist'], (prev: string[]) => {
            return prev.filter((id) => id !== res.data);
          });
        }
      }
    },
    onError: () => {
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
    },
  });
}

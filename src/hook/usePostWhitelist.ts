import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { toast } from 'sonner';

export default function usePostWhitelist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['postWhitelist'],
    mutationFn: async ({ session, channelId }: { session: Session; channelId: string }) => {
      const response = await axios.post<{ message: string; data: string }>(
        `/api/whitelist/${channelId}`,
        {},
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } },
      );
      return response.data; //채널 아이디
    },
    onSuccess: (res) => {
      toast.success(res.message);
      if (queryClient.getQueryData(['whitelist'])) {
        queryClient.setQueryData(['whitelist'], (prev: string[]) => {
          return [...prev, res.data];
        });
      }
    },
    onError: () => {
      toast.error('서버에러가 발생했습니다. 잠시후 다시 시도해주세요.');
      queryClient.invalidateQueries({ queryKey: ['whitelist'] });
    },
  });

  return mutation;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';
import { toast } from 'sonner';

export default function useDeleteBlacklist() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['deleteBlacklist'],
    mutationFn: async ({ session, channelId }: { session: Session; channelId: string }) => {
      const response = await axios.delete<{ message: string; data: string }>(
        `/api/v1/blacklist/${channelId}`,
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } },
      );
      return response.data; //채널 아이디
    },
    onSuccess: (res) => {
      toast.success(res.message);
      if (queryClient.getQueryData(['blacklist'])) {
        queryClient.setQueryData(['blacklist'], (pre: string[]) => {
          return pre.filter((channelId) => channelId !== res.data);
        });
      }
    },
    onError: (error) => {
      toast.error('서버에 문제가 발생했습니다. 다시 시도해주세요.');
      queryClient.invalidateQueries({ queryKey: ['blacklist'] });
    },
  });

  return mutation;
}

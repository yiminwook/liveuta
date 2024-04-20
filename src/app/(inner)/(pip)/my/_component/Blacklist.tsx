'use client';
import { ChannelData } from '@/type/api/mongoDB';
import { channelListAtom } from '@inner/_lib/atom/common';
import { blacklistAtom } from '@inner/_lib/atom/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import * as styles from './list.css';
import axios from 'axios';

type BlacklistProps = {
  session: Session;
};

export default function Blacklist({ session }: BlacklistProps) {
  const queryCilent = useQueryClient();
  const [channelList] = useAtom(channelListAtom);
  const [blacklist] = useAtom(blacklistAtom);

  const mutationDelete = useMutation({
    mutationKey: ['deleteBlacklist'],
    mutationFn: async ({ session, channelId }: { session: Session; channelId: string }) => {
      const response = await axios.delete<{ message: string; data: string }>(
        `/api/blacklist/${channelId}`,
        { headers: { Authorization: `Bearer ${session.user.accessToken}` } },
      );
      return response.data; //채널 아이디
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message);
        queryCilent.invalidateQueries({ queryKey: ['blacklist'] });
      } else {
        toast.success(res.message);
        if (queryCilent.getQueryData(['blacklist'])) {
          queryCilent.setQueryData(['blacklist'], (pre: string[]) => {
            return pre.filter((channelId) => channelId !== res.data);
          });
        }
      }
    },
    onError: (error) => {
      toast.error('서버에 문제가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleClick = (channelId: string) => {
    if (confirm('블럭을 취소하시겠습니까?')) {
      mutationDelete.mutate({ session, channelId });
    }
  };

  const data = [...blacklist]
    .map<ChannelData>((item) => channelList[item])
    .filter((item) => !!item)
    .sort((a, b) => a.name_kor.localeCompare(b.name_kor));

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.channel_id} className={styles.row}>
            <span className={styles.text}>{item.name_kor}</span>
            <button
              className={styles.button}
              onClick={() => handleClick(item.channel_id)}
              disabled={mutationDelete.isPending}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

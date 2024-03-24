'use client';
import { ChannelData } from '@/type/api/mongoDB';
import { deleteBlacklist } from '@inner/_action/blacklist';
import { channelListAtom } from '@inner/_lib/atom';
import { blacklistAtom } from '@inner/_lib/atom/schedule';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import * as styles from './blackList.css';

type BlacklistProps = {
  session: Session;
};

export default function Blacklist({ session }: BlacklistProps) {
  const queryCilent = useQueryClient();
  const [channelList] = useAtom(channelListAtom);
  const [blacklist] = useAtom(blacklistAtom);

  const mutationDelete = useMutation({
    mutationKey: ['deleteBlacklist'],
    mutationFn: deleteBlacklist,
    onSuccess: (res) => {
      if (!res.result) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        if (queryCilent.getQueryData(['blacklist'])) {
          queryCilent.setQueryData(['blacklist'], (pre: string[]) => {
            return pre.filter((channelId) => channelId !== res.result);
          });
        }
      }
    },
    onError: (error) => toast.error('서버에 문제가 발생했습니다. 다시 시도해주세요.'),
  });

  const handleClick = (item: string) => {
    if (confirm('블럭을 취소하시겠습니까?')) {
      mutationDelete.mutate({ accessToken: session.user.accessToken, channelId: item });
    }
  };

  const data = [...blacklist]
    .map<ChannelData>((item) => channelList[item])
    .filter((item) => !!item);

  return (
    <ul className={styles.wrap}>
      {data.map((item) => (
        <li key={item.channel_id} className={styles.row}>
          <span>{item.name_kor}</span>
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
  );
}

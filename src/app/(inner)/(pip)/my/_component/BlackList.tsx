'use client';
import { deleteBlacklist } from '@inner/_action/blacklist';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import * as styles from './blackList.css';
import { ChannelData } from '@/type/api/mongoDB';
import { useAtom } from 'jotai';
import { channelListAtom, schedule } from '@inner/_lib/atom';
import { blackListAtom } from '@inner/_lib/atom/schedule';

type BlackListProps = {
  session: Session;
};

export default function BlackList({ session }: BlackListProps) {
  const queryCilent = useQueryClient();
  const [scheduleQueryKey] = useAtom(schedule.scheduleKeyAtom);
  const [channelList] = useAtom(channelListAtom);
  const [blackList] = useAtom(blackListAtom);

  const mutationDelete = useMutation({
    mutationKey: ['deleteBlacklist'],
    mutationFn: deleteBlacklist,
    onSuccess: (res) => {
      if (!res.result) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        queryCilent.invalidateQueries({ queryKey: scheduleQueryKey });
        queryCilent.setQueryData<string[]>(['blackList'], (pre) => {
          return pre?.filter((channelId) => channelId !== res.result);
        });
      }
    },
    onError: (error) => toast.error('서버에 문제가 발생했습니다. 다시 시도해주세요.'),
  });

  const handleClick = (item: string) => {
    if (confirm('블럭을 취소하시겠습니까?')) {
      mutationDelete.mutate({ accessToken: session.user.accessToken, channelId: item });
    }
  };

  const data = [...blackList]
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

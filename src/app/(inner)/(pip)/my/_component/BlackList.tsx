'use client';
import { deleteBlacklist } from '@inner/_action/blacklist';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import * as styles from './blackList.css';
import { ChannelData } from '@/type/api/mongoDB';
import getBlackListData from '../_lib/getBlackListData';
import { useAtom } from 'jotai';
import { schedule } from '@inner/_lib/atom';

type BlackListProps = {
  session: Session;
};

export default function BlackList({ session }: BlackListProps) {
  const queryCilent = useQueryClient();
  const [scheduleQueryKey] = useAtom(schedule.scheduleKeyAtom);

  const { data } = useQuery({
    queryKey: ['blackList'],
    queryFn: () =>
      getBlackListData(session).then((res) => {
        if (!res.result) {
          throw new Error(res.message);
        } else {
          return res.result;
        }
      }),
    staleTime: 5 * 1000, // 5초
    gcTime: 60 * 3 * 1000, // 3분
  });

  const mutationDelete = useMutation({
    mutationKey: ['deleteBlacklist'],
    mutationFn: deleteBlacklist,
    onSuccess: (res) => {
      if (!res.result) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        queryCilent.invalidateQueries({ queryKey: scheduleQueryKey });
        queryCilent.setQueryData<ChannelData[]>(['blackList'], (pre) => {
          return pre?.filter((item) => item.channel_id !== res.result);
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

  if (!data) return <div>로딩중...</div>;

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

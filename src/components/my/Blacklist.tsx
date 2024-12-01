'use client';
import useDeleteBlacklist from '@/hooks/useDeleteBlacklist';
import { ChannelData } from '@/types/api/mongoDB';
import { Session } from 'next-auth';
import * as styles from './list.css';

type BlacklistProps = {
  session: Session;
  channelList: Record<string, ChannelData>;
  blacklist: Set<string>;
};

export default function Blacklist({ session, channelList, blacklist }: BlacklistProps) {
  const mutationDelete = useDeleteBlacklist();

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

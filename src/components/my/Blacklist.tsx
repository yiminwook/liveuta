'use client';
import useDeleteBlacklist from '@/hooks/useDeleteBlacklist';
import { TChannelData } from '@/types/api/mongoDB';
import { Session } from 'next-auth';
import css from './List.module.scss';

type BlacklistProps = {
  session: Session;
  channelList: Record<string, TChannelData>;
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
    .map<TChannelData>((item) => channelList[item])
    .filter((item) => !!item)
    .sort((a, b) => a.name_kor.localeCompare(b.name_kor));

  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {data.map((item) => (
          <li key={item.channel_id} className={css.row}>
            <span className={css.text}>{item.name_kor}</span>
            <button
              className={css.button}
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

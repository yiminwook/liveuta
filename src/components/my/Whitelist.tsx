'use client';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import { ChannelData } from '@/types/api/mongoDB';
import { Session } from 'next-auth';
import css from './List.module.scss';

type WhitelistProps = {
  session: Session;
  whiteList: Set<string>;
  channelList: Record<string, ChannelData>;
};

export default function Whitelist({ session, whiteList, channelList }: WhitelistProps) {
  const mutationDelete = useMutateWhitelist();

  const handleClick = (channelId: string) => {
    if (confirm('즐겨찾기을 취소하시겠습니까?')) {
      mutationDelete.mutate({ session, channelId });
    }
  };

  const data = [...whiteList]
    .map<ChannelData>((item) => channelList[item])
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

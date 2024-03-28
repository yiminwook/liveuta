'use client';
import { ChannelData } from '@/type/api/mongoDB';
import { channelListAtom } from '@inner/_lib/atom';
import { whitelistAtom } from '@inner/_lib/atom/schedule';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Session } from 'next-auth';
import * as styles from './list.css';
import useMutateWhitelist from '@/hook/useDeleteWhitelist';

type WhitelistProps = {
  session: Session;
};

export default function Whitelist({ session }: WhitelistProps) {
  const [channelList] = useAtom(channelListAtom);
  const [whitelist] = useAtom(whitelistAtom);

  const mutationDelete = useMutateWhitelist();

  const handleClick = (item: string) => {
    if (confirm('즐겨찾기을 취소하시겠습니까?')) {
      mutationDelete.mutate({ accessToken: session.user.accessToken, channelId: item });
    }
  };

  const data = [...whitelist]
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

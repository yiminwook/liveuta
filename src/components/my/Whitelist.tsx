'use client';
import useMutateWhitelist from '@/hooks/useDeleteWhitelist';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { generateChanneImagelUrl } from '@/libraries/youtube/url';
import { TChannelData } from '@/types/api/mongoDB';
import { Avatar, Button } from '@mantine/core';
import { Session } from 'next-auth';
import css from './List.module.scss';

type WhitelistProps = {
  session: Session;
  whiteList: Set<string>;
  channelList: Record<string, TChannelData>;
};

export default function Whitelist({ session, whiteList, channelList }: WhitelistProps) {
  const locale = useLocale();
  const { t } = useTranslations(locale);

  const mutationDelete = useMutateWhitelist();

  const handleClick = (channelId: string) => {
    if (confirm(t('my.favorite.removeFavorite'))) {
      mutationDelete.mutate({ session, channelId });
    }
  };

  const data = [...whiteList]
    .map<TChannelData>((item) => channelList[item])
    .filter((item) => !!item)
    .sort((a, b) => a.name_kor.localeCompare(b.name_kor));

  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {data.map((item) => (
          <li key={item.channel_id} className={css.row}>
            <div className={css.channelBox}>
              <Avatar
                size="md"
                mr="0.85rem"
                src={generateChanneImagelUrl(item.profile_picture_url, { size: 40 })}
              />
              <span className={css.text}>{item.name_kor}</span>
            </div>
            <Button
              size="xs"
              fz="0.95rem"
              onClick={() => handleClick(item.channel_id)}
              loading={mutationDelete.isPending}
            >
              {t('my.favorite.remove')}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

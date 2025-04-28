import dayjs from '@/libraries/dayjs';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { generateChanneImagelUrl, generateThumbnail } from '@/libraries/youtube/url';
import { TChannelData, TContentData } from '@/types/api/mongoDB';
import { ActionIcon, Avatar } from '@mantine/core';
import classNames from 'classnames';
import css from './GridNav.module.scss';

type Props = {
  content: TContentData;
  channel: TChannelData | undefined;
  onAddById: (videoId: string) => void;
};

export default function GridNavItem({ content, channel, onAddById }: Props) {
  const locale = useLocale();
  const { t } = useTranslations();

  const time = dayjs(content.timestamp).locale(locale).format(t('dayjsScheduleTemplate'));

  const channelImage = channel?.profile_picture_url
    ? generateChanneImagelUrl(channel.profile_picture_url, {
        size: 40,
      })
    : generateThumbnail(content.videoId, 'mqdefault');

  return (
    <div className={css.listItem}>
      <div className={css.listItemHeader}>
        <div className={css.listItemHeaderLeft}>
          <Avatar className={css.avatar} size="md" src={channelImage} />
          <div>
            <span className={classNames(css.channelName, css.line)}>{channel?.name_kor}</span>
            {content.viewer > 0 && <span className={css.line}>Viewer: {content.viewer}</span>}
          </div>
        </div>
        <ActionIcon variant="light" onClick={() => onAddById(content.videoId)}>
          +
        </ActionIcon>
      </div>
      <time className={css.line}>{time}</time>
      <p className={css.title}>{content.title}</p>
    </div>
  );
}

import dayjs from '@/libraries/dayjs';
import { generateThumbnail } from '@/libraries/youtube/thumbnail';
import { TChannelData, TContentData } from '@/types/api/mongoDB';
import { ActionIcon, Avatar } from '@mantine/core';
import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import css from './GridNav.module.scss';

type Props = {
  content: TContentData;
  channel: TChannelData | undefined;
  onAddById: (videoId: string) => void;
};

export default function GridNavItem({ content, channel, onAddById }: Props) {
  const thumbnail = generateThumbnail(content.videoId, 'mqdefault');
  const t = useTranslations();
  const locale = useLocale();
  const time = dayjs(content.timestamp).locale(locale).format(t('dayjsScheduleTemplate'));

  return (
    <div className={css.listItem}>
      <div className={css.listItemHeader}>
        <div className={css.listItemHeaderLeft}>
          <Avatar className={css.avatar} size="md" src={thumbnail} />
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

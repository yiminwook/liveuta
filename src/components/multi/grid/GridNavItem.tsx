import { useTranslations } from '@/libraries/i18n/client';
import { generateChanneImagelUrl, generateThumbnail } from '@/libraries/youtube/url';
import { TChannelDocumentWithoutId, TParsedClientContent } from '@/types/api/mongoDB';
import { ActionIcon, Avatar } from '@mantine/core';
import classNames from 'classnames';
import css from './GridNav.module.scss';

type Props = {
  content: TParsedClientContent;
  channel: TChannelDocumentWithoutId | undefined;
  onAddById: (videoId: string) => void;
};

export default function GridNavItem({ content, channel, onAddById }: Props) {
  const { t } = useTranslations();

  const time = content.utcTime.format(t('time.longTemplate'));

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

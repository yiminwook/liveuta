import dayjs from '@/libraries/dayjs';
import { generateChannelUrl } from '@/libraries/youtube/url';
import { TChannelData, TContentData } from '@/types/api/mongoDB';
import { openWindow } from '@/utils/windowEvent';
import cx from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import css from './Card.module.scss';
import CardStatus from './CardStatus';

type CardDescProps = {
  content: TContentData;
  channel: TChannelData | undefined;
  addStreamModifier: string;
};

/*
 * grid 높이가 일정해야하기 때문에 텍스트 라인을 고정할 필요가 있음
 *
 * 채널명 1줄, 제목 2줄, 시간 1줄
 */
export default function CardDesc({ content, addStreamModifier, channel }: CardDescProps) {
  const { title, utcTime, interval, isStream, viewer, channelId } = content;

  const channelUrl = generateChannelUrl(channelId);
  const locale = useLocale();
  const t = useTranslations();

  const openChannel = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWindow(e.currentTarget.href);
  };

  return (
    <div className={css.descBox}>
      <span>
        <a
          title={channel?.name_kor}
          className={cx(css.channelNm, addStreamModifier)}
          href={channelUrl}
          onClick={openChannel}
        >
          {channel?.name_kor}
        </a>
      </span>
      <p title={title} className={cx(css.title, addStreamModifier)}>
        {title}
      </p>
      <div className={css.time}>
        <time>{dayjs(utcTime).locale(locale).format(t('dayjsScheduleTemplate'))}</time>
        <CardStatus isStream={isStream} interval={interval} viewer={viewer} />
      </div>
    </div>
  );
}

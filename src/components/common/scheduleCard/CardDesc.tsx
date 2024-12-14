import { generateChannelUrl } from '@/libraries/youtube/url';
import { TContentsData } from '@/types/api/mongoDB';
import { openWindow } from '@/utils/windowEvent';
import cx from 'classnames';
import CardStatus from './CardStatus';
import css from './ScheduleCard.module.scss';

type CardDescProps = {
  content: TContentsData;
  addStreamModifier: string;
};

/*
 * grid 높이가 일정해야하기 때문에 텍스트 라인을 고정할 필요가 있음
 *
 * 채널명 1줄, 제목 2줄, 시간 1줄
 */
export default function CardDesc({ content, addStreamModifier }: CardDescProps) {
  const { title, channelName, korTime, interval, isStream, viewer, channelId } = content;

  const channelUrl = generateChannelUrl(channelId);

  const openChannel = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWindow(e.currentTarget.href);
  };

  return (
    <div className={css.descBox}>
      <span>
        <a
          title={channelName}
          className={cx(css.channelNm, addStreamModifier)}
          href={channelUrl}
          onClick={openChannel}
        >
          {channelName}
        </a>
      </span>
      <p title={title} className={cx(css.title, addStreamModifier)}>
        {title}
      </p>
      <div className={css.time}>
        <time className={'kor'} title={korTime}>
          {korTime}
        </time>
        <CardStatus isStream={isStream} interval={interval} viewer={viewer} />
      </div>
    </div>
  );
}

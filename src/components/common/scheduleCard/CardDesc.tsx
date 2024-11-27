import { generateChannelUrl } from '@/libraries/youtube/url';
import { ContentsDataType } from '@/types/api/mongoDB';
import { openWindow } from '@/utils/windowEvent';
import cx from 'classnames';
import { Session } from 'next-auth';
import CardStatus from './CardStatus';
import CardNav from './CardNav';
import css from './ScheduleCard.module.scss';

type CardDescProps = {
  content: ContentsDataType;
  addStreamModifier: string;
  session: Session | null;
};

export default function CardDesc({ session, content, addStreamModifier }: CardDescProps) {
  const { title, channelName, korTime, interval, isStream, viewer, channelId } = content;

  const channelUrl = generateChannelUrl(channelId);

  const openChannel = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWindow(e.currentTarget.href);
  };

  return (
    <div className={css.descBox}>
      <a className={cx(css.channelNm, addStreamModifier)} href={channelUrl} onClick={openChannel}>
        {channelName}
      </a>
      <p className={cx(css.title, addStreamModifier)}>{title}</p>
      <div className={css.time}>
        <time className={'kor'}>{korTime}</time>
        <CardStatus isStream={isStream} interval={interval} viewer={viewer} />
      </div>
      <CardNav content={content} session={session} />
    </div>
  );
}

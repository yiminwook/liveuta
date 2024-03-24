import { generateChannelUrl } from '@/model/youtube/url';
import { ContentsDataType } from '@/type/api/mongoDB';
import { openWindow } from '@inner/_lib/windowEvent';
import cx from 'classnames';
import { Session } from 'next-auth';
import CardStatus from '../scheduleCard/CardStatus';
import CardNav from './CardNav';
import * as styles from './card.css';

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
    <div className={styles.descBox}>
      <a
        className={cx(styles.channelName, addStreamModifier)}
        href={channelUrl}
        onClick={openChannel}
      >
        {channelName}
      </a>
      <p className={cx(styles.title, addStreamModifier)}>{title}</p>
      <div className={styles.time}>
        <time className={'kor'}>{korTime}</time>
        <CardStatus isStream={isStream} interval={interval} viewer={viewer} />
      </div>
      <CardNav content={content} session={session} />
    </div>
  );
}

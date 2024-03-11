import { ContentsDataType } from '@/type/api/mongoDB';
import cx from 'classnames';
import { Session } from 'next-auth';
import CardStatus from '../scheduleCard/CardStatus';
import CardNav from './CardNav';
import * as styles from './card.css';

type CardDescProps = {
  content: ContentsDataType;
  addStreamModifier: string;
  session: Session | null;
  onClickBlock: () => void;
};

export default function CardDesc({
  session,
  content,
  addStreamModifier,
  onClickBlock,
}: CardDescProps) {
  const { title, channelName, korTime, interval, isStream, viewer } = content;

  return (
    <div className={styles.descBox}>
      <div className={cx(styles.channelName, addStreamModifier)}>{channelName}</div>
      <p className={cx(styles.title, addStreamModifier)}>{title}</p>
      <div className={styles.time}>
        <time className={'kor'}>{korTime}</time>
        <CardStatus isStream={isStream} interval={interval} viewer={viewer} />
      </div>
      <CardNav content={content} session={session} onClickBlock={onClickBlock} />
    </div>
  );
}

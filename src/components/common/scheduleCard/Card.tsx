'use client';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
import { ContentsDataType } from '@/types/api/mongoDB';
import { memo, useMemo } from 'react';
import { Session } from 'next-auth';
import cx from 'classnames';
import css from './ScheduleCard.module.scss';

type ScheduleCardProps = {
  content: ContentsDataType;
  session: Session | null;
};

export default memo(function ScheduleCard({ session, content }: ScheduleCardProps) {
  const { isStream } = content;

  const addStreamModifier = useMemo(() => {
    let streamModifer: string;

    switch (isStream) {
      case 'FALSE':
        streamModifer = 'closed';
        break;
      case 'TRUE':
        streamModifer = 'stream';
        break;
      default:
        streamModifer = '';
    }

    return streamModifer;
  }, [isStream]);

  return (
    <div className={cx(css.card, addStreamModifier)}>
      <CardImage content={content} />
      <CardDesc session={session} content={content} addStreamModifier={addStreamModifier} />
    </div>
  );
});

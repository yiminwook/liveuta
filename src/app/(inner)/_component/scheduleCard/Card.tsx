'use client';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
//import { ContentsDataType } from '@/types/inSheet';
import { ContentsDataType } from '@/type/api/mongoDB';
import cx from 'classnames';
import { useMemo, useRef } from 'react';
import * as styles from './card.css';

interface ScheduleCardProps {
  content: ContentsDataType;
  currentIndex: number;
}

export default function ScheduleCard({ content, currentIndex }: ScheduleCardProps) {
  const { videoId, isStream } = content;
  const target = useRef<HTMLDivElement>(null);

  const addStreamModifier = useMemo(() => {
    let streamModifer: string;

    switch (isStream) {
      case 'FALSE':
        streamModifer = 'closed';
        break;
      case 'TRUE':
        streamModifer = 'stream';
        break;
      case 'NULL':
        streamModifer = '';
        break;
      default:
        streamModifer = '';
    }

    return streamModifer;
  }, [isStream]);

  return (
    <div className={cx('scheduleCard', styles.card, addStreamModifier)} key={videoId} ref={target}>
      <CardImage content={content} />
      <CardDesc content={content} addStreamModifier={addStreamModifier} />
    </div>
  );
}

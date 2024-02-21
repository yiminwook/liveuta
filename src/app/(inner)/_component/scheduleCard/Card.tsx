'use client';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
//import { ContentsDataType } from '@/types/inSheet';
import { ContentsDataType } from '@/type/api/mongoDB';
import cx from 'classnames';
import { useMemo, useRef } from 'react';
import Motion from '@/model/framer';
import * as styles from './card.css';

const cardVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      //너무 짧으면 모바일에서 두번 깜빡거림
      delay: index > 20 ? 0.5 : index * 0.1,
    },
  }),
};

interface ScheduleCardProps {
  content: ContentsDataType;
  index: number;
}

export default function ScheduleCard({ content, index }: ScheduleCardProps) {
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
    <Motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      viewport={{
        once: true,
      }}
      className={cx('scheduleCard', styles.card, addStreamModifier)}
      key={videoId}
      ref={target}
    >
      <CardImage content={content} />
      <CardDesc content={content} addStreamModifier={addStreamModifier} />
    </Motion.div>
  );
}

'use client';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
import { ContentsDataType } from '@/type/api/mongoDB';
import { useMemo } from 'react';
import CardWrap from './CardWrap';

interface ScheduleCardProps {
  content: ContentsDataType;
  index: number;
}

export default function ScheduleCard({ content, index }: ScheduleCardProps) {
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
      case 'NULL':
        streamModifer = '';
        break;
      default:
        streamModifer = '';
    }

    return streamModifer;
  }, [isStream]);

  return (
    <CardWrap index={index} className={addStreamModifier}>
      <CardImage content={content} />
      <CardDesc content={content} addStreamModifier={addStreamModifier} />
    </CardWrap>
  );
}

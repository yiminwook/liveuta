'use client';
import CardDesc from './CardDesc';
import CardImage from './CardImage';
import { ContentsDataType } from '@/type/api/mongoDB';
import { useMemo, useState } from 'react';
import CardWrap from './CardWrap';
import { Session } from 'next-auth';
import cx from 'classnames';

interface ScheduleCardProps {
  content: ContentsDataType;
  index: number;
  session: Session | null;
}

export default function ScheduleCard({ session, content, index }: ScheduleCardProps) {
  const [isBlock, setIsBlock] = useState(false);
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

  const handleBlock = () => {
    setIsBlock(() => true);
  };

  return (
    <CardWrap index={index} className={cx(addStreamModifier, isBlock && 'block')}>
      <CardImage content={content} />
      <CardDesc
        session={session}
        content={content}
        addStreamModifier={addStreamModifier}
        onClickBlock={handleBlock}
      />
    </CardWrap>
  );
}

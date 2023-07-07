'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContentsDataType } from '@/types/inSheet';
import Link from 'next/link';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import SchduleCardImage from '@/components/common/scheduleCard/ScheduleCardImage';
import ScheduleCardDesc from '@/components/common/scheduleCard/ScheduleCardDesc';

interface ScheduleCardProps {
  content: ContentsDataType;
  currentIndex: number;
  lastContentsIndex: number;
  handleInfinityScroll?: () => void;
}

const ScheduleCard = ({ content, currentIndex, lastContentsIndex, handleInfinityScroll }: ScheduleCardProps) => {
  const { url, videoId, isStream } = content;
  const target = useRef<HTMLDivElement>(null);

  const addStreamModifier = useMemo(() => {
    let streamModifer: string;

    switch (isStream) {
      case 'FALSE':
        streamModifer = scheduleCard['closed'];
        break;
      case 'TRUE':
        streamModifer = scheduleCard['stream'];
        break;
      case 'NULL':
        streamModifer = '';
        break;
      default:
        streamModifer = '';
    }

    return streamModifer;
  }, []);

  const onIntersect: IntersectionObserverCallback = useCallback(
    (items, observer) => {
      if (!handleInfinityScroll) return;
      const currentTarget = target.current;
      const isIntersecting = items[0].isIntersecting;
      if (!(currentTarget && isIntersecting && currentIndex === lastContentsIndex)) return;
      //마지막 요소가 관찰될때만
      handleInfinityScroll();
      observer.unobserve(currentTarget);
    },
    [target, lastContentsIndex],
  );

  useEffect(() => {
    if (!handleInfinityScroll) return;
    const currentTarget = target.current;
    if (!(currentTarget && currentIndex === lastContentsIndex)) return;
    //마지막 요소만 관찰
    const observer = new IntersectionObserver(onIntersect, { rootMargin: '100%' });
    observer.observe(currentTarget);

    return () => observer.disconnect();
  }, [target, content, lastContentsIndex]);

  return (
    <div className={[scheduleCard['card'], addStreamModifier].join(' ')} key={videoId} ref={target}>
      <div className={scheduleCard['content']}>
        <Link href={url}>
          <SchduleCardImage content={content} />
        </Link>
        <ScheduleCardDesc content={content} addStreamModifier={addStreamModifier} />
      </div>
    </div>
  );
};

export default ScheduleCard;

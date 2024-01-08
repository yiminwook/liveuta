'use client';
import React, { MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { ContentsDataType } from '@/types/inSheet';
import scheduleCard from '@/components/common/scheduleCard/ScheduleCard.module.scss';
import SchduleCardImage from '@/app/test/CardImage';
import ScheduleCardDesc from '@/app/test/CardDesc';
import { combineClassName } from '@/utils/combineClassName';
import { gtagClickAtag } from '@/utils/gtag';
import styled from '@emotion/styled';

const Card = styled.div`
  margin: 0;
  flex: 1 0 auto;
  width: 15rem;
  max-width: 50%;
  background-color: #fff;
  border-radius: 5px;

  &.closed {
    background-color: lighten(map-get($colors, light-blue), 3%);
  }

  &.stream {
    background-color: map-get($colors, light-yellow);
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

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
  }, [isStream]);

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

  const linkClickEvent = (e: MouseEvent<HTMLAnchorElement>) =>
    gtagClickAtag(e, {
      target: 'scheduleCard',
      content: content.channelName,
      detail: content.title,
      action: 'atag',
    });

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
    <Card className={combineClassName('card', addStreamModifier)} key={videoId} ref={target}>
      <div className={scheduleCard['content']}>
        <a href={url} onClick={linkClickEvent}>
          <SchduleCardImage content={content} />
        </a>
        <ScheduleCardDesc content={content} addStreamModifier={addStreamModifier} />
      </div>
    </Card>
  );
};

export default ScheduleCard;

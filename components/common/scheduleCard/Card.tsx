'use client';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { ContentsDataType } from '@/types/inSheet';
import SchduleCardImage from '@/components/common/scheduleCard/CardImage';
import ScheduleCardDesc from '@/components/common/scheduleCard/CardDesc';
import { cx } from '@/utils';
import styled from '@emotion/styled';
import { BEZIER_CURVE, boxShadow, COLORS, WIDTH } from '@/styles/var';
import { css } from '@emotion/react';

export const cardBase = css`
  margin: 0;
  flex: 1 0 auto;
  width: 15rem;
  max-width: 100%;

  @media (min-width: ${WIDTH.SM}) {
    max-width: 50%;
  }
`;

const Card = styled.div`
  ${cardBase}
  ${boxShadow}
  display: flex;
  padding: 0.25rem;
  gap: 0.25rem;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.2s ${BEZIER_CURVE};

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: ${WIDTH.SM}) {
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
  }

  &.closed {
    background-color: ${COLORS['light-blue']};
  }

  &.stream {
    background-color: ${COLORS['light-yellow']};
  }
`;

interface ScheduleCardProps {
  content: ContentsDataType;
  currentIndex: number;
  lastContentsIndex: number;
  handleInfinityScroll?: () => void;
}

const ScheduleCard = ({ content, currentIndex, lastContentsIndex, handleInfinityScroll }: ScheduleCardProps) => {
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
    <Card className={cx(addStreamModifier)} key={videoId} ref={target}>
      <SchduleCardImage content={content} />
      <ScheduleCardDesc content={content} addStreamModifier={addStreamModifier} />
    </Card>
  );
};

export default ScheduleCard;

import ScheduleCardDesc from '@/components/common/scheduleCard/CardDesc';
import SchduleCardImage from '@/components/common/scheduleCard/CardImage';
import { Card } from '@/components/common/scheduleCard/Style';
import { ContentsDataType } from '@/types/inSheet';
import { cx } from '@/utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';

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

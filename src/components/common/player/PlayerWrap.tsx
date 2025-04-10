'use client';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { useEffect, useRef, useState } from 'react';
import Player from './Player';
import css from './Player.module.scss';

export default function PlayerWrap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(true);
  const status = useScheduleStatus();

  const handleInteresect: IntersectionObserverCallback = (items) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null) return;
    const observer = new IntersectionObserver(handleInteresect);
    requestAnimationFrame(() => {
      // 요소 랜더링 후 옵저버 시작
      observer.observe(current);
    });
    return () => observer.disconnect();
  }, [status]);

  if (status === 'pending') return null;

  return (
    <div ref={wrapRef} className={css.playerBox}>
      <Player isShow={isShow} isLive={true} />
    </div>
  );
}

'use client';
import useScheduleStatus from '@/hooks/useScheduleStatus';
import { useEffect, useRef, useState } from 'react';
import LiveChat from './LiveChat';
import Player from './Player';
import css from './Player.module.scss';
import PlayerPlaceholder from './PlayerPlaceholder';

export default function PlayerWrap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const status = useScheduleStatus();

  const handleInteresect: IntersectionObserverCallback = (items) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null) return;
    const observer = new IntersectionObserver(handleInteresect);
    observer.observe(current);
    return () => observer.disconnect();
  }, [status]);

  if (status === 'pending') return null;

  return (
    <div ref={wrapRef} className={css.playerBox}>
      {!isShow && <PlayerPlaceholder />}
      <Player isShow={isShow} isLive={true} />
      <LiveChat />
    </div>
  );
}

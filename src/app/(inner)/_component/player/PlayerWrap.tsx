'use client';
import { useEffect, useRef, useState } from 'react';
import LiveChat from './LiveChat';
import Player from './Player';
import * as styles from './player.css';
import useScheduleStatus from '@/hook/useScheduleStatus';
import PlayerPlaceholder from './PlayerPlaceholder';

interface PlayerWrapProps {}

export default function PlayerWrap({}: PlayerWrapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  const status = useScheduleStatus();

  const handleInteresect: IntersectionObserverCallback = (items, observer) => {
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
    <div ref={wrapRef} className={styles.playerBox}>
      {!isShow ? <PlayerPlaceholder /> : null}
      <Player isShow={isShow} isLive={true} />
      <LiveChat />
    </div>
  );
}

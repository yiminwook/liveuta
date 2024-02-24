'use client';
import { usePlayerAtom } from '@/app/(inner)/_lib/atom';
import { useEffect, useRef, useState } from 'react';
import LiveChat from './LiveChat';
import Player from './Player';
import * as styles from './player.css';
import useScheduleStatus from '@/hook/useScheduleStatus';

interface PlayerWrapProps {}

export default function PlayerWrap({}: PlayerWrapProps) {
  const [playerValue] = usePlayerAtom();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  const handleInteresect: IntersectionObserverCallback = (items, observer) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  const status = useScheduleStatus();

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null) return;
    const observer = new IntersectionObserver(handleInteresect);
    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  const showPlaceholder = isShow === false;

  if (status === 'pending') return null;

  return (
    <div ref={wrapRef} className={styles.playerBox}>
      {showPlaceholder ? <div className={styles.playerPlaceholder} /> : null}
      <Player isShow={isShow} />
      <LiveChat videoId={playerValue.videoId} />
    </div>
  );
}

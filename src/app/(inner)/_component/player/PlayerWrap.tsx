'use client';
import { usePlayerAtom } from '@/app/(inner)/_lib/atom';
import { useEffect, useRef, useState } from 'react';
import LiveChat from './LiveChat';
import Player from './Player';
import * as styles from './player.css';

interface PlayerWrapProps {
  isDesktop: boolean;
}

export default function PlayerWrap({ isDesktop }: PlayerWrapProps) {
  const [playerValue] = usePlayerAtom();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

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
  }, []);

  const showPlaceholder = isShow === false;

  return (
    <div ref={wrapRef} className={styles.playerBox}>
      {showPlaceholder ? <div className={styles.playerPlaceholder} /> : null}
      <Player isShow={isShow} />
      <LiveChat videoId={playerValue.videoId} isDesktop={isDesktop} />
    </div>
  );
}

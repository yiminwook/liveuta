'use client';
import PlayerPlaceholder from '@inner/_component/player/PlayerPlaceholder';
import { player } from '@inner/_lib/atom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import * as styles from '@inner/_component/player/player.css';
import { isMobile } from 'react-device-detect';

const Player = dynamic(() => import('@inner/_component/player/Player'), {
  ssr: false,
  loading: () => <PlayerPlaceholder />,
});

type PlayerWrapProps = {
  videoId: string;
};

export default function SetlistPlayer({ videoId }: PlayerWrapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [, setPlayer] = useAtom(player.playerVideoIdAtom);
  const [isShow, setIsShow] = useState(true);

  const handleInteresect: IntersectionObserverCallback = (items, observer) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    setPlayer(() => videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null || isMobile) return;
    const observer = new IntersectionObserver(handleInteresect);
    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={styles.playerBox}>
      {!isShow ? <PlayerPlaceholder /> : null}
      <Player isLive={false} isShow={isShow} />
    </div>
  );
}

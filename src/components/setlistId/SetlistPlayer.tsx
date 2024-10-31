'use client';
import PlayerPlaceholder from '@/components/common/player/PlayerPlaceholder';
import * as styles from '@/components/common/player/player.css';
import { playerStatusAtom, playerVideoIdAtom } from '@/stores/player';
import { useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const Player = dynamic(() => import('@/components/common/player/Player'), {
  ssr: false,
  loading: () => <PlayerPlaceholder />,
});

type PlayerWrapProps = {
  videoId: string;
};

export default function SetlistPlayer({ videoId }: PlayerWrapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const timestamp = Number(searchParams.get('t')) || 0;
  const setPlayerStatus = useSetAtom(playerStatusAtom);
  const setPlayerVideoId = useSetAtom(playerVideoIdAtom);
  const [isShow, setIsShow] = useState(true);

  const handleInteresect: IntersectionObserverCallback = (items, observer) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    // 자동재생 되지 않도록 설정
    setPlayerStatus((pre) => ({ ...pre, isPlaying: false, timeline: timestamp }));
    setPlayerVideoId(() => videoId);
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

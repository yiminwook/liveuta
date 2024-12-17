'use client';
import css from '@/components/common/player/Player.module.scss';
import PlayerPlaceholder from '@/components/common/player/PlayerPlaceholder';
import { usePlayerStore } from '@/stores/player';
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
  const prepareSetlist = usePlayerStore((state) => state.actions.prepareSetlist);
  const [isShow, setIsShow] = useState(true);

  const handleInteresect: IntersectionObserverCallback = (items) => {
    const isIntersecting = items[0].isIntersecting;
    setIsShow(() => isIntersecting);
  };

  useEffect(() => {
    prepareSetlist(videoId, timestamp);
  }, []);

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null || isMobile) return;
    const observer = new IntersectionObserver(handleInteresect);
    requestAnimationFrame(() => {
      // 요소 랜더링 후 옵저버 시작
      observer.observe(current);
    });
    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div ref={wrapRef} className={css.playerBox}>
      {!isShow && <PlayerPlaceholder />}
      <Player isShow={isShow} isLive={false} />
    </div>
  );
}

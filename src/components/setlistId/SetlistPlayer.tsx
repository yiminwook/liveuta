'use client';
import css from '@/components/common/player/Player.module.scss';
import { DefaultPlayerPlaceholder } from '@/components/common/player/PlayerPlaceholder';
import { useLocale } from '@/libraries/i18n/client';
import { useSetPlayerStore } from '@/stores/player';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const DraggablePlayer = dynamic(
  () => import('@/components/common/player/DndComponents').then((mod) => mod.DraggablePlayer),
  {
    ssr: false,
    loading: () => <DefaultPlayerPlaceholder />,
  },
);

type PlayerWrapProps = {
  videoId: string;
};

export default function SetlistPlayer({ videoId }: PlayerWrapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const locale = useLocale();
  const timestamp = Number(searchParams.get('t')) || 0;
  const [isShow, setIsShow] = useState(true);
  const actions = useSetPlayerStore();

  useEffect(() => {
    actions.prepareSetlist(videoId, timestamp);
  }, []);

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null || isMobile) return;
    const observer = new IntersectionObserver((items) => {
      const isIntersecting = items[0].isIntersecting;
      setIsShow(() => isIntersecting);
    });

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
      {!isShow && <DefaultPlayerPlaceholder />}
      <DraggablePlayer mode={isShow ? 'default' : 'pip'} locale={locale} />
    </div>
  );
}

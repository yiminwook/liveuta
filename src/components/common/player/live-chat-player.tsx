'use client';
import { useEffect, useRef, useState } from 'react';
import { TLocaleCode } from '@/libraries/i18n/type';
import { DraggablePlayer } from './dnd-components';
import LiveChat from './live-chat';
import css from './player.module.scss';
import { DefaultPlayerPlaceholder } from './player-placeholder';

export default function LiveChatPlayer({ locale }: { locale: TLocaleCode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const current = wrapRef.current;
    if (current === null) return;

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
  }, []);

  return (
    <div ref={wrapRef} className={css.playerBox}>
      {!isShow && <DefaultPlayerPlaceholder />}
      <DraggablePlayer mode={isShow ? 'default' : 'pip'} locale={locale} autoLoad />
      <LiveChat />
    </div>
  );
}

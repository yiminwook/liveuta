'use client';
import { useEffect, useRef, useState } from 'react';
import { DraggablePlayer } from './DndComponents';
import LiveChat from './LiveChat';
import css from './Player.module.scss';
import { DefaultPlayerPlaceholder } from './PlayerPlaceholder';

export default function LiveChatPlayer() {
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
      <DraggablePlayer mode={isShow ? 'default' : 'pip'} />
      <LiveChat />
    </div>
  );
}

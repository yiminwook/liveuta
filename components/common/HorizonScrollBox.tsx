'use client';

import { useEffect, useRef } from 'react';
import horizonScrollBox from '@/components/common/HorizonScrollBox.module.scss';
import { cx } from '@/utils';

interface HorizonScrollBoxProps {
  className?: string;
  children: React.ReactNode;
}

/** 가로방향으로 스크롤 가능한 Div */
const HorizonScrollBox = ({ className = '', children }: HorizonScrollBoxProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = (e: WheelEvent) => {
    e.preventDefault(); //Box 외부 스크롤 방지
    const currentRef = scrollRef.current;
    if (e.deltaY == 0 || currentRef === null) return;
    currentRef.scrollTo({
      left: currentRef.scrollLeft + e.deltaY,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (current === null) return;
    current.addEventListener('wheel', onScroll, { passive: false });
    return () => current.removeEventListener('wheel', onScroll);
  }, []);

  return (
    <div className={cx(horizonScrollBox['wrap'], className)} ref={scrollRef}>
      <div>{children}</div>
    </div>
  );
};

export default HorizonScrollBox;

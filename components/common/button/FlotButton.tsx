'use client';
import { combineClassName } from '@/utils/combineClassName';
import { useEffect, useMemo, useState } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';

const FloatButton = () => {
  const [isTop, setIsTop] = useState(true);

  const scrollHandler = useMemo(() => {
    let timer: NodeJS.Timeout | null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        setIsTop(() => (window.scrollY > 0 ? false : true));
      }, 300);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <button
      className={combineClassName('foat', isTop ? 'hide' : '')}
      onClick={scrollUp}
      onTouchEnd={scrollUp}
      onTouchStart={scrollUp}
    >
      <TfiArrowCircleUp size="3rem" color="inherit" />
    </button>
  );
};

export default FloatButton;

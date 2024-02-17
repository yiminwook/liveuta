'use client';
import cx from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { TfiArrowCircleUp } from 'react-icons/tfi';
import * as styles from './floatButton.css';

export default function FloatButton() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      className={cx(styles.button, 'right', 'hover', isTop && 'hide')}
      onClick={scrollUp}
      onTouchEnd={scrollUp}
      onTouchStart={scrollUp}
    >
      <TfiArrowCircleUp size="3rem" color="inherit" />
    </button>
  );
}

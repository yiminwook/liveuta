'use client';
import useIsTop from '@/hooks/useIsTop';
import { combineClassName } from '@/utils/combineClassName';
import { TfiArrowCircleUp } from 'react-icons/tfi';

const FloatButton = () => {
  const { isTop } = useIsTop();

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

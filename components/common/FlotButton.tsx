'use client';
import { TfiArrowCircleUp } from 'react-icons/tfi';

const FloatButton = () => {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="foat" onClick={scrollUp} onTouchEnd={scrollUp} onTouchStart={scrollUp}>
      <TfiArrowCircleUp size={'3rem'} color={'inherit'} />
    </button>
  );
};

export default FloatButton;

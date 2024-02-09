'use client';
import { useEffect, useState } from 'react';

const useResponsive = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleResize = () => {
    setSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
  };

  useEffect(() => {
    if (isLoading === true) {
      setSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
      return setIsLoading(() => false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    isMobile: size.width < 640,
    isTablet: size.width < 968 && size.width >= 640,
    isDesktop: size.width >= 968,
    width: size.width,
    height: size.height,
  };
};

export default useResponsive;

'use client';
import { useEffect, useState } from 'react';

const useResponsive = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const handleResize = () => {
    setSize(() => ({ width: window.innerWidth, height: window.innerHeight }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: size.width < 640,
    isTablet: size.width >= 640 && size.width < 768,
    isDesktop: size.width >= 768,
    width: size.width,
    height: size.height,
  };
};

export default useResponsive;

import { useEffect, useState } from 'react';

const useIsTop = () => {
  const [isTop, setIsTop] = useState<boolean>(true);
  
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 0) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return isTop;
};

export default useIsTop;

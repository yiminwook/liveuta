import { useEffect, useMemo, useState } from 'react';

const useIsTop = () => {
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

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return { isTop };
};

export default useIsTop;

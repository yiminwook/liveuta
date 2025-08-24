import { useEffect, useRef, useState } from 'react';

/** no ssr */
export const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(() => true);
  }, []);

  return isMounted;
};

export const useHook = (fn: () => void) => {
  const hasRun = useRef(false);

  if (!hasRun.current) {
    hasRun.current = true;
    fn();
  }
};

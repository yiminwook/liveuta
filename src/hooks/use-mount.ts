import { useEffect, useState } from 'react';

/** no ssr */
export const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(() => true);
  }, []);

  return isMounted;
};

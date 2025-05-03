import { useCallback, useState } from 'react';

/**
 * class: enter => show => show exit
 *
 */
export const useTransition = () => {
  const [modifier, setModifier] = useState<string[]>(['enter']);

  const onAnimationEnd = useCallback(() => {
    setModifier((pre) => (pre.includes('enter') ? ['show'] : pre));
  }, []);

  const exit = useCallback((cb: () => void) => {
    setModifier(() => ['show', 'exit']);
    setTimeout(() => cb(), 300);
  }, []);

  return {
    modifier,
    onAnimationEnd,
    exit,
  };
};

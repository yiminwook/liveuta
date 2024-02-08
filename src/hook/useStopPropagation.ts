import { UIEvent, useCallback } from 'react';

const useStopPropagation = <T extends UIEvent>() => {
  const stopPropagation = useCallback((e: T) => {
    e.stopPropagation();
  }, []);

  return { stopPropagation };
};
export default useStopPropagation;

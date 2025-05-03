import { useEffect, useState } from 'react';

/**
 * Debounce a value
 * @param {T} value Value to debounce
 * @param {number} delay Delay in milliseconds (must be greater than 0)
 * @returns {T} Debounced value
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debounced = useDebounced(search, 1000);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  if (delay <= 0) {
    throw new Error('Delay should be greater than 0');
  }

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

import { useLocalStorage } from '@mantine/hooks';
import { z } from 'zod';

export const AUTO_SYNC_KEY = 'auto-sync';
export const AUTO_SYNC_DEFAULT_VALUE = true;

export const AUTO_SYNC_REFRESH_INTERVAL_KEY = 'auto-sync-refresh-interval';
export const AUTO_SYNC_REFRESH_INTERVAL_OPTIONS = [3, 5, 10, 15, 30, 60];
export const AUTO_SYNC_REFRESH_INTERVAL_DEFAULT_VALUE = 3;

const checkRefreshInterval = z
  .preprocess((v) => Number(v), z.number())
  .refine((v) => AUTO_SYNC_REFRESH_INTERVAL_OPTIONS.includes(v));

export const useAutoSync = () => {
  const [isActive, setIsActive, removeIsUseAutoSync] = useLocalStorage({
    key: AUTO_SYNC_KEY,
    defaultValue: AUTO_SYNC_DEFAULT_VALUE,
    serialize: (v) => v.toString(),
    deserialize: (v) => (v === 'true' ? true : false),
  });

  const [refreshInterval, setRefreshInterval, removeRefreshInterval] = useLocalStorage({
    key: AUTO_SYNC_REFRESH_INTERVAL_KEY,
    defaultValue: AUTO_SYNC_REFRESH_INTERVAL_DEFAULT_VALUE,
    serialize: (v) => v.toString(),
    deserialize: (v) => {
      const result = checkRefreshInterval.safeParse(v);
      return result.success ? result.data : AUTO_SYNC_REFRESH_INTERVAL_DEFAULT_VALUE;
    },
  });

  return {
    isActive,
    setIsActive,
    removeIsUseAutoSync,
    refreshInterval,
    setRefreshInterval,
    removeRefreshInterval,
  };
};

import { siteConfig } from '@/siteConfig';
import { useLocalStorage } from '@mantine/hooks';
import { z } from 'zod';

export const AUTO_SYNC_KEY = 'auto-sync';
export const AUTO_SYNC_REFRESH_INTERVAL_KEY = 'auto-sync-refresh-interval';

const checkRefreshInterval = z
  .preprocess((v) => Number(v), z.number())
  .refine((v) => siteConfig.refreshIntervalOptions.includes(v));

export const useAutoSync = () => {
  const [isActive, setIsActive, removeIsUseAutoSync] = useLocalStorage({
    key: AUTO_SYNC_KEY,
    defaultValue: siteConfig.defaultUseAutoSync,
    serialize: (v) => v.toString(),
    deserialize: (v) => (v === 'true' ? true : false),
  });

  const [refreshInterval, setRefreshInterval, removeRefreshInterval] = useLocalStorage({
    key: AUTO_SYNC_REFRESH_INTERVAL_KEY,
    defaultValue: siteConfig.defaultRefreshInterval,
    serialize: (v) => v.toString(),
    deserialize: (v) => {
      const result = checkRefreshInterval.safeParse(v);
      return result.success ? result.data : siteConfig.defaultRefreshInterval;
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

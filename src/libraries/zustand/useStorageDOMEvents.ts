import { useEffect } from 'react';
import { Mutate, StoreApi } from 'zustand';

type StoreWithPersist<T> = Mutate<StoreApi<T>, [['zustand/persist', any]]>;

export const useStorageDOMEvents = <T>(store: StoreWithPersist<T>) => {
  useEffect(() => {
    const storageEventCallback = (e: StorageEvent) => {
      if (e.key === store.persist.getOptions().name && e.newValue) {
        store.persist.rehydrate();
      }
    };

    window.addEventListener('storage', storageEventCallback);

    return () => {
      window.removeEventListener('storage', storageEventCallback);
    };
  }, []);
};

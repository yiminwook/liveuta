import { PersistStorage } from 'zustand/middleware';

// https://zustand.docs.pmnd.rs/integrations/persisting-store-data#storage

// 버전체크는 자동으로 됨
export const createLocalStorage = <T>(): PersistStorage<T> => {
  return {
    getItem(name) {
      try {
        const item = localStorage.getItem(name);
        if (!item) return null;
        return JSON.parse(item);
      } catch (e) {
        console.error(e);
        console.warn('Failed to parse multi view data');
        this.removeItem(name);
        return null;
      }
    },
    setItem(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem(name) {
      localStorage.removeItem(name);
    },
  };
};

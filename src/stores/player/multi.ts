import { atom } from 'jotai';

export const multiListAtom = atom<string[]>([]);

multiListAtom.onMount = (setAtom) => {
  const data = localStorage.getItem('shortList');
  if (data) {
    const list = JSON.parse(data);
    if (Array.isArray(list)) {
      const arr: string[] = list.filter((item) => typeof item === 'string');
      localStorage.setItem('shortList', JSON.stringify(arr));
      setAtom(() => arr);
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  multiListAtom.debugLabel = 'multiListAtom';
}

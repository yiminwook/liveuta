import { StreamCategory } from '@/types';
import { atom } from 'jotai';

export const featuredAtom = atom<'categories' | 'vtubers'>('categories');
export const categoryAtom = atom<StreamCategory>(StreamCategory.live);

if (process.env.NODE_ENV === 'development') {
  featuredAtom.debugLabel = 'selectAtom';
}

import { atom } from 'jotai';
import { RowProps } from '../_component/Row';

export const setlistModalAtom = atom<RowProps | null>(null);

if (process.env.NODE_ENV === 'development') {
  setlistModalAtom.debugLabel = 'setlistModalAtom';
}

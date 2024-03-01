import { atom, useAtom } from 'jotai';
import { RowProps } from '../_component/Row';

export const setlistModalAtom = atom<RowProps | null>(null);

export const useSetlistModalAtom = () => useAtom(setlistModalAtom);

if (process.env.NODE_ENV === 'development') {
  setlistModalAtom.debugLabel = 'setlistModalAtom';
}

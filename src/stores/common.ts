import { atom } from 'jotai';

export const sidebarAtom = atom(false);

export const accountSidebarAtom = atom(false);

if (process.env.NODE_ENV === 'development') {
  sidebarAtom.debugLabel = 'sidebarAtom';
  accountSidebarAtom.debugLabel = 'accountSidebarAtom';
}

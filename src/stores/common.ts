import { ChannelListData } from '@/types/api/mongoDB';
import { atom } from 'jotai';

export const sidebarAtom = atom(false);

export const accountSidebarAtom = atom(false);

export const channelListAtom = atom<ChannelListData>({});

if (process.env.NODE_ENV === 'development') {
  sidebarAtom.debugLabel = 'sidebarAtom';
  accountSidebarAtom.debugLabel = 'accountSidebarAtom';
  channelListAtom.debugLabel = 'channelListAtom';
}

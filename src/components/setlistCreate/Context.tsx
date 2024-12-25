'use client';
import type { HMS } from '@/types/time';
import { hmsToSeconds, hmsToString } from '@/utils/getTime';
import { createRef } from 'react';
import ReactPlayer from 'react-player';
import { create } from 'zustand';

export type SetlistItem = {
  id: number;
  checked: boolean;
  time: HMS;
  value: string;
};

type PlayerStates = {
  url: string;
  playerRef: React.RefObject<ReactPlayer | null>;
  playerReady: boolean;
};

type PlayerActions = {
  setUrl: (url: string) => void;
  onPlayerReady: () => void;
};

type PlayerStore = PlayerStates & {
  actions: PlayerActions;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  url: '',
  playerRef: createRef<ReactPlayer | null>(),
  playerReady: false,
  actions: {
    setUrl: (url) => set(() => ({ url })),
    onPlayerReady: () =>
      set(() => ({
        playerReady: true,
      })),
  },
}));
export const usePlayerActions = () => usePlayerStore((state) => state.actions);

type SetlistStates = {
  setlist: SetlistItem[];
  setlistAllChecked: boolean;
  autoSort: boolean;
};

type SetlistActions = {
  addItem: (time: HMS, value: string) => void;
  removeItem: (id: number) => void;
  setSetlist: (setlist: SetlistItem[]) => void;
  clearSetlist: () => void;
  checkAll: (checked: boolean) => void;
  sortSetlist: () => void;
  setAutoSort: (autoSort: boolean) => void;
  setItemTime: (id: number, time: { h: number; m: number; s: number }) => void;
  setItemValue: (id: number, value: string) => void;
  setItemChecked: (id: number, checked: boolean) => void;
  clearChecked: () => void;
  removeChecked: () => void;
};

type SetlistStore = SetlistStates & {
  actions: SetlistActions;
};

function sortItem(a: SetlistItem, b: SetlistItem) {
  return hmsToSeconds(a.time) - hmsToSeconds(b.time);
}

let id = 0;

export const useSetlistStore = create<SetlistStore>((set) => ({
  setlist: [
    { id: -1, checked: false, time: { h: 0, m: 0, s: 0 }, value: '첫 번째 곡' },
    { id: -2, checked: false, time: { h: 0, m: 1, s: 0 }, value: '두 번째 곡' },
    { id: -3, checked: false, time: { h: 0, m: 2, s: 0 }, value: '세 번째 곡' },
    { id: -4, checked: false, time: { h: 3, m: 3, s: 0 }, value: '네 번째 곡' },
  ],
  setlistAllChecked: false,
  autoSort: false,
  actions: {
    addItem: (time: HMS, value) =>
      set((state) => {
        const setlist = [
          ...state.setlist,
          {
            id: id++,
            checked: false,
            time,
            value,
          },
        ];

        if (state.autoSort) {
          setlist.sort(sortItem);
        }

        return {
          setlist,
          setlistAllChecked: false,
        };
      }),
    removeItem: (id) =>
      set((state) => {
        const setlist = state.setlist.filter((item) => item.id !== id);
        const setlistAllChecked = setlist.every((item) => item.checked);
        return { setlist, setlistAllChecked };
      }),
    checkAll: (checked) => {
      set((state) => {
        const setlist = state.setlist.map((item) => ({ ...item, checked }));
        return { setlist, setlistAllChecked: checked };
      });
    },
    setSetlist: (setlist) =>
      set((state) => {
        if (state.autoSort) {
          setlist.sort(sortItem);
        }

        return { setlist };
      }),
    clearSetlist: () => set(() => ({ setlist: [], setlistAllChecked: false })),
    sortSetlist: () =>
      set((state) => ({
        setlist: [...state.setlist].toSorted(sortItem),
      })),
    setAutoSort: (autoSort) => set(() => ({ autoSort })),
    setItemTime: (id, time) =>
      set((state) => {
        const setlist = [...state.setlist];
        const index = setlist.findIndex((item) => item.id === id);
        setlist[index].time = time;

        if (state.autoSort) {
          setlist.sort(sortItem);
        }

        return { setlist };
      }),
    setItemValue: (id, value) =>
      set((state) => {
        const setlist = [...state.setlist];
        const index = setlist.findIndex((item) => item.id === id);
        setlist[index].value = value;
        return { setlist };
      }),
    setItemChecked: (id, checked) =>
      set((state) => {
        const setlist = [...state.setlist];
        const index = setlist.findIndex((item) => item.id === id);
        setlist[index].checked = checked;

        const setlistAllChecked = setlist.every((item) => item.checked);

        return { setlist, setlistAllChecked };
      }),
    clearChecked: () =>
      set((state) => {
        const setlist = [...state.setlist];

        for (const item of setlist) {
          if (item.checked) {
            item.value = '';
          }
        }

        return { setlist };
      }),
    removeChecked: () =>
      set((state) => {
        const setlist = state.setlist.filter((item) => !item.checked);
        return { setlist, setlistAllChecked: false };
      }),
  },
}));
export const useSetlistActions = () => useSetlistStore((state) => state.actions);

export function setlistItemToString(item: SetlistItem) {
  return `${hmsToString(item.time)} ${item.value}`;
}

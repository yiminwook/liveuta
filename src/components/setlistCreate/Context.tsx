'use client';
import { hmsToSeconds } from '@/utils/getTime';
import { createRef } from 'react';
import ReactPlayer from 'react-player';
import { create } from 'zustand';

export type Time = {
  h: number;
  m: number;
  s: number;
};

export type SetlistItem = {
  id: number;
  checked: boolean;
  time: Time;
  value: string;
};

type SetlistStates = {
  url: string;
  playerRef: React.RefObject<ReactPlayer | null>;
  playerReady: boolean;
  setlist: SetlistItem[];
  setlistAllChecked: boolean;
  autoSort: boolean;
};

type SetlistActions = {
  // url
  setUrl: (url: string) => void;
  // player
  onPlayerReady: () => void;
  // setlist
  addSetlist: (time: Time, value: string) => void;
  removeSetlist: (id: number) => void;
  setSetlist: (setlist: SetlistItem[]) => void;
  clearSetlist: () => void;
  checkAll: (checked: boolean) => void;
  sortSetlist: () => void;
  setAutoSort: (autoSort: boolean) => void;
  setItemTime: (id: number, time: { h: number; m: number; s: number }) => void;
  setItemValue: (id: number, value: string) => void;
  setItemChecked: (id: number, checked: boolean) => void;
};

type SetlistStore = SetlistStates & SetlistActions;

let id = 0;

function sortItem(a: SetlistItem, b: SetlistItem) {
  return hmsToSeconds(a.time.h, a.time.m, a.time.s) - hmsToSeconds(b.time.h, b.time.m, b.time.s);
}

export const useSetlistStore = create<SetlistStore>((set) => ({
  // url
  url: '',
  setUrl: (url) => set(() => ({ url })),
  // player
  playerRef: createRef<ReactPlayer | null>(),
  playerReady: false,
  onPlayerReady: () =>
    set(() => ({
      playerReady: true,
    })),
  // setlist
  setlist: [
    // { id: -1, checked: false, time: { h: 0, m: 0, s: 0 }, value: '첫 번째 곡' },
    // { id: -2, checked: false, time: { h: 0, m: 1, s: 0 }, value: '두 번째 곡' },
    // { id: -3, checked: false, time: { h: 0, m: 2, s: 0 }, value: '세 번째 곡' },
    // { id: -4, checked: false, time: { h: 3, m: 3, s: 0 }, value: '네 번째 곡' },
  ],
  setlistAllChecked: false,
  autoSort: false,
  addSetlist: (time: Time, value) =>
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
  removeSetlist: (id) =>
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
}));

export function timeToString(time: Time) {
  const formattedHour = time.h === 0 ? '' : `${time.h}:`.padStart(3, '0');
  const formattedMinute = `${time.m}`.padStart(2, '0');
  const formattedSecond = `${time.s}`.padStart(2, '0');

  return `${formattedHour}${formattedMinute}:${formattedSecond}`;
}

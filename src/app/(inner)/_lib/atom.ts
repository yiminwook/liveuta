import { SelectType } from '@/type';
import { ContentsDataReturnType, ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { atom, useAtom } from 'jotai';

export const sidebarAtom = atom(false);
export const useSidebarAtom = () => useAtom(sidebarAtom);

export const accountSidebarAtom = atom(false);
export const useAccountSidebarAtom = () => useAtom(accountSidebarAtom);

export const playerAtom = atom({
  videoId: 'IiCKMyNuFYc',
  isPlaying: false,
  isMutted: false,
  hide: true,
});

export const usePlayerAtom = () => useAtom(playerAtom);

const SCHEDULE_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

export const scheduleKeyAtom = atom(['schedule']);

const scheduleOptionAtom = atom({
  staleTime: 1000 * 60 * 1, // 1 minute
  gcTime: SCHEDULE_REFRESH_INTERVAL,
  refetchInterval: SCHEDULE_REFRESH_INTERVAL,
  refetchOnReconnect: true,
  refetchOnWindowFocus: false,
  refetchIntervalInBackground: false,
});

export const scheduleAtom = atom<ScheduleAPIReturntype>({
  scheduled: { contents: [], length: { total: 0, video: 0, stream: 0 } },
  live: { contents: [], length: { total: 0, video: 0, stream: 0 } },
  daily: { contents: [], length: { total: 0, video: 0, stream: 0 } },
  all: { contents: [], length: { total: 0, video: 0, stream: 0 } },
});

export const filterAtom = atom<keyof ScheduleAPIReturntype>('all');
export const selectAtom = atom<SelectType>('all');

export const selectedScheduleAtom = atom((get): ContentsDataReturnType => {
  const schedule = get(scheduleAtom);
  const filter = get(filterAtom);
  const select = get(selectAtom);

  const filtered = schedule[filter];
  switch (select) {
    case 'stream':
      return {
        contents: filtered.contents.filter((content) => !content.isVideo),
        length: filtered.length,
      };
    case 'video':
      return {
        contents: filtered.contents.filter((content) => content.isVideo),
        length: filtered.length,
      };
    default:
      return filtered;
  }
});

export const useFilterAtom = () => useAtom(filterAtom);
export const useSelectAtom = () => useAtom(selectAtom);
export const useScheduleKeyAtom = () => useAtom(scheduleKeyAtom);
export const useScheduleOptionAtom = () => useAtom(scheduleOptionAtom);
export const useScheduleAtom = () => useAtom(scheduleAtom);
export const useSelectedScheduleAtom = () => useAtom(selectedScheduleAtom);

if (process.env.NODE_ENV === 'development') {
  playerAtom.debugLabel = 'playerAtom';
  filterAtom.debugLabel = 'filterAtom';
  selectAtom.debugLabel = 'selectAtom';
  scheduleAtom.debugLabel = 'scheduleAtom';
  scheduleKeyAtom.debugLabel = 'scheduleKeyAtom';
  scheduleOptionAtom.debugLabel = 'scheduleOptionAtom';
  selectedScheduleAtom.debugLabel = 'selectedScheduleAtom';
}

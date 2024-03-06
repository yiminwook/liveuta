import { SelectType } from '@/type';
import { ContentsDataReturnType, ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { atom } from 'jotai';

const SCHEDULE_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

export const scheduleKeyAtom = atom(['schedule']);

export const scheduleOptionAtom = atom({
  staleTime: 1000 * 60 * 1, // 1 minute
  gcTime: SCHEDULE_REFRESH_INTERVAL,
  refetchInterval: SCHEDULE_REFRESH_INTERVAL as number | false | undefined,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
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

if (process.env.NODE_ENV === 'development') {
  filterAtom.debugLabel = 'filterAtom';
  selectAtom.debugLabel = 'selectAtom';
  scheduleAtom.debugLabel = 'scheduleAtom';
  scheduleKeyAtom.debugLabel = 'scheduleKeyAtom';
  scheduleOptionAtom.debugLabel = 'scheduleOptionAtom';
  selectedScheduleAtom.debugLabel = 'selectedScheduleAtom';
}

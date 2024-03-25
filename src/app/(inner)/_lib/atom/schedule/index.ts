import { VideoType } from '@/type';
import { ScheduleAPIReturntype } from '@/type/api/mongoDB';
import { atom } from 'jotai';

const SCHEDULE_REFRESH_INTERVAL = 1000 * 60 * 3; // 3 minutes

export const scheduleOptionAtom = atom({
  staleTime: SCHEDULE_REFRESH_INTERVAL,
  gcTime: SCHEDULE_REFRESH_INTERVAL,
  refetchInterval: SCHEDULE_REFRESH_INTERVAL as number | false | undefined,
  refetchOnReconnect: true,
  refetchOnWindowFocus: true,
  refetchIntervalInBackground: false,
});

export const scheduleAtom = atom<ScheduleAPIReturntype>({
  scheduled: [],
  live: [],
  daily: [],
  all: [],
});

export const filterAtom = atom<keyof ScheduleAPIReturntype>('scheduled');
export const selectAtom = atom<VideoType>(VideoType.all);
export const blacklistAtom = atom<Set<string>>(new Set([]));
export const whitelistAtom = atom<Set<string>>(new Set([]));
/** 블랙리스트를 제외할지, 화이트리스트만 보여줄지 여부 */
export const toggleBlacklistAtom = atom(true);

toggleBlacklistAtom.onMount = (set) => {
  set(() => localStorage.getItem('favorite') !== 'true');
};

export const selectedScheduleAtom = atom((get) => {
  const schedule = get(scheduleAtom);
  const filter = get(filterAtom);
  const select = get(selectAtom);
  const blacklist = get(blacklistAtom);
  const whiteList = get(whitelistAtom);
  const toggleBlacklist = get(toggleBlacklistAtom);

  let allCount = 0;
  let videoCount = 0;

  const filteredContent = schedule[filter].filter((content) => {
    const inBlacklist = blacklist.has(content.channelId);
    const inWhitelist = whiteList.has(content.channelId);

    // 화이트리스트/블랙리스트에 따른 필터링 조건
    let isPassList: Boolean;
    if (toggleBlacklist) {
      // 블랙리스트 모드에서는 블랙리스트에 없어야 함
      isPassList = !inBlacklist;
    } else {
      // 화이트리스트 모드에서는 화이트리스트에 있어야 함
      isPassList = inWhitelist;
    }

    // 리스트필터링이 적용된 비디오 수를 카운트
    if (isPassList) allCount++;
    if (content.isVideo && isPassList) videoCount++;

    // 스트림/비디오/전체 선택에 따른 필터링 조건
    let isPassType: Boolean;
    switch (select) {
      case VideoType.stream:
        isPassType = !content.isVideo;
        break;
      case VideoType.video:
        isPassType = content.isVideo;
        break;
      default:
        // 'all' 선택 시 모든 타입을 포함
        isPassType = true;
        break;
    }

    // 모든 필터링 조건을 만족해야 합니다.
    return isPassList && isPassType;
  });

  return {
    content: filteredContent,
    length: {
      all: allCount,
      stream: allCount - videoCount,
      video: videoCount,
    },
  };
});

if (process.env.NODE_ENV === 'development') {
  filterAtom.debugLabel = 'filterAtom';
  selectAtom.debugLabel = 'selectAtom';
  scheduleAtom.debugLabel = 'scheduleAtom';
  scheduleOptionAtom.debugLabel = 'scheduleOptionAtom';
  selectedScheduleAtom.debugLabel = 'selectedScheduleAtom';
  blacklistAtom.debugLabel = 'blackListAtom';
  whitelistAtom.debugLabel = 'whiteListAtom';
}

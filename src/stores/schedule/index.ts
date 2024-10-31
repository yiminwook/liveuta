import { addExcapeCharacter } from '@/utils/regexp';
import { VideoType } from '@/types';
import { ScheduleAPIReturnType } from '@/types/api/mongoDB';
import { atom } from 'jotai';

export const scheduleAtom = atom<ScheduleAPIReturnType>({
  scheduled: [],
  live: [],
  daily: [],
  all: [],
  featured: [],
});

export const filterAtom = atom<keyof ScheduleAPIReturnType>('scheduled');
/** 채널 이름으로 검색 */
export const queryAtom = atom('');
export const selectAtom = atom<VideoType>(VideoType.all);
export const blacklistAtom = atom<Set<string>>(new Set([]));
export const whitelistAtom = atom<Set<string>>(new Set([]));
/** 블랙리스트를 제외할지, 화이트리스트만 보여줄지 여부 */
export const toggleBlacklistAtom = atom(true);

export const selectedScheduleAtom = atom((get) => {
  const schedule = get(scheduleAtom);
  const filter = get(filterAtom);
  const select = get(selectAtom);
  const blacklist = get(blacklistAtom);
  const whiteList = get(whitelistAtom);
  const toggleBlacklist = get(toggleBlacklistAtom);
  const queryString = addExcapeCharacter(get(queryAtom));
  const query = new RegExp(queryString, 'i');

  let allCount = 0;
  let videoCount = 0;

  const filteredContent = schedule[filter].filter((content) => {
    // 1. 채널 이름 필터링
    if (!query.test(content.channelName)) return false;

    const inBlacklist = blacklist.has(content.channelId);
    const inWhitelist = whiteList.has(content.channelId);

    // 2. 화이트리스트/블랙리스트에 따른 필터링 조건
    let isPassList: boolean;
    if (toggleBlacklist) {
      // 블랙리스트 모드에서는 블랙리스트에 없어야 함
      isPassList = !inBlacklist;
    } else {
      // 화이트리스트 모드에서는 화이트리스트에 있어야 함
      isPassList = inWhitelist;
    }

    // 3. 스트림/비디오/전체 선택에 따른 필터링 조건
    let isPassType: boolean;
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

    // 리스트필터링이 적용된 비디오 수를 카운트
    if (isPassList) allCount++;
    if (content.isVideo && isPassList) videoCount++;

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

export const selectedFeaturedCategoryAtom = atom(1);

if (process.env.NODE_ENV === 'development') {
  filterAtom.debugLabel = 'filterAtom';
  selectAtom.debugLabel = 'selectAtom';
  queryAtom.debugLabel = 'queryAtom';
  scheduleAtom.debugLabel = 'scheduleAtom';
  selectedScheduleAtom.debugLabel = 'selectedScheduleAtom';
  selectedFeaturedCategoryAtom.debugLabel = 'selectedFeaturedCategoryAtom';
  blacklistAtom.debugLabel = 'blackListAtom';
  whitelistAtom.debugLabel = 'whiteListAtom';
  toggleBlacklistAtom.debugLabel = 'toggleBlacklistAtom';
}

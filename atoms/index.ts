import { atomWithReset } from 'jotai/utils';
import { atom, useAtom } from 'jotai';
import { SelectType, ThemeType } from '@/types';
import { SheetAPIReturntype } from '@/types/inSheet';

export const themeAtom = atomWithReset<ThemeType>('theme1');
export const useThemeAtom = () => useAtom(themeAtom);

export const filterAtom = atomWithReset<keyof SheetAPIReturntype>('live');
export const useFilterAtom = () => useAtom(filterAtom);

export const selectAtom = atomWithReset<SelectType>('all');
export const useSelectAtom = () => useAtom(selectAtom);

export const isLoadingSheetAtom = atomWithReset(false);
export const useIsLoadingSheetAtom = () => useAtom(isLoadingSheetAtom);

export const isLoadingSearchAtom = atomWithReset(false);
export const useIsLoadingSearchAtom = () => useAtom(isLoadingSearchAtom);

export const isLoadingAtom = atom((get) => {
  const isSheetLoading = get(isLoadingSheetAtom);
  const isSearchLoading = get(isLoadingSearchAtom);
  return isSheetLoading || isSearchLoading;
});

export const playerAtom = atom({
  url: '',
  videoId: '',
  isPlaying: false,
  isMutted: false,
  pip: false,
});

export const usePlayerAtom = () => useAtom(playerAtom);

if (process.env.NODE_ENV === 'development') {
  themeAtom.debugLabel = 'themeAtom';
  selectAtom.debugLabel = 'selectAtom';
  isLoadingAtom.debugLabel = 'isLoadingAtom';
  isLoadingSheetAtom.debugLabel = 'sheetLoadingAtom';
  isLoadingSearchAtom.debugLabel = 'searchLoadingAtom';
  playerAtom.debugLabel = 'playerAtom';
  filterAtom.debugLabel = 'filterAtom';
}

import { darkModeStorage } from '@/models/darkModeLocalStorage';
import useSWR from 'swr';

export const useDarkModeStorage = () => {
  //os darkmode 체크
  const getDarkMode = () => darkModeStorage.Data;
  const { data: isDarkMode = false, mutate: mutateDarkMode } = useSWR('darkmode', getDarkMode);

  return { isDarkMode, mutateDarkMode };
};

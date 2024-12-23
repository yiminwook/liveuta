import { TTheme } from '@/types';

export const waitfor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isDarkModeEnabled = (theme: TTheme) => {
  const themeIndex = Number(theme.replace('theme', '')) || 1;
  return themeIndex > 3;
};

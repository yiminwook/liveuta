'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { themeAtom, themeStyleAtom } from '@/stores/atom';
import { TGetCookiesReturn } from '@/utils/getCookie';
import * as themes from '@/styles/themeAsis';

type GlobalHydrateProps = {
  children: React.ReactNode;
  cookies: TGetCookiesReturn;
};

export default function GlobalHydrate({ children, cookies }: GlobalHydrateProps) {
  const theme = cookies.theme;
  const themeStyle = themes?.[theme] || themes.theme1;

  useHydrateAtoms([
    [themeAtom, theme],
    [themeStyleAtom, themeStyle],
  ]);

  return <>{children}</>;
}

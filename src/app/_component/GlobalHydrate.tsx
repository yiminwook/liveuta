'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { themeAtom, themeStyleAtom } from '@/app/_lib/atom';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';
import * as themes from '@/style/theme';

type GlobalHydrateProps = {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
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

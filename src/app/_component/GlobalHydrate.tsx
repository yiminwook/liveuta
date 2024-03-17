'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { themeAtom, themeStyleAtom } from '@/app/_lib/atom';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';
import * as styles from '@/style/globalTheme.css';

interface GlobalHydrateProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

export default function GlobalHydrate({ children, cookies }: GlobalHydrateProps) {
  useHydrateAtoms([
    [themeAtom, cookies.theme],
    [themeStyleAtom, styles[cookies.theme]],
  ]);

  return <>{children}</>;
}

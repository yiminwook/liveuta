'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { selectAtom, themeAtom } from '@/app/_lib/atom';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';

interface GlobalHydrateProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

export default function GlobalHydrate({ children, cookies }: GlobalHydrateProps) {
  useHydrateAtoms([
    [themeAtom, cookies.theme],
    [selectAtom, cookies.select],
  ]);

  return <>{children}</>;
}

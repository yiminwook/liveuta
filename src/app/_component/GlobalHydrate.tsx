'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { selectAtom, themeAtom } from '@/app/_lib/atom';
import { GetCookiesReturnType } from '@/util/getCookie';

interface GlobalHydrateProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

const GlobalHydrate = ({ children, cookies }: GlobalHydrateProps) => {
  useHydrateAtoms([
    [themeAtom, cookies.theme],
    [selectAtom, cookies.select],
  ]);

  return <>{children}</>;
};

export default GlobalHydrate;

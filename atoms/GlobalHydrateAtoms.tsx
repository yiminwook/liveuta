'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { selectAtom, themeAtom } from '@/atoms';
import { GetCookiesReturnType } from '@/utils/getCookie';

interface GlobalHydrateAtomsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

const GlobalHydrateAtoms = ({ children, cookies }: GlobalHydrateAtomsProps) => {
  useHydrateAtoms([
    [themeAtom, cookies.theme],
    [selectAtom, cookies.select],
  ]);

  return <>{children}</>;
};

export default GlobalHydrateAtoms;

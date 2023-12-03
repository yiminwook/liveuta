'use client';
import { useHydrateAtoms } from 'jotai/utils';
import { themeAtom } from '@/components/atoms';
import { ThemeType } from '@/hooks/useTheme';

interface GlobalHydrateAtomsProps {
  children: React.ReactNode;
  theme: ThemeType;
}

const GlobalHydrateAtoms = ({ children, theme }: GlobalHydrateAtomsProps) => {
  useHydrateAtoms(new Map([[themeAtom, theme]]));

  return <>{children}</>;
};

export default GlobalHydrateAtoms;

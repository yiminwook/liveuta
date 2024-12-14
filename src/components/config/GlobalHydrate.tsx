'use client';
import { themeAtom } from '@/stores/atom';
import { TGetCookiesReturn } from '@/utils/getCookie';
import { useHydrateAtoms } from 'jotai/utils';

type GlobalHydrateProps = {
  children: React.ReactNode;
  cookies: TGetCookiesReturn;
};

export default function GlobalHydrate({ children, cookies }: GlobalHydrateProps) {
  const theme = cookies.theme;

  useHydrateAtoms([[themeAtom, theme]]);

  return <>{children}</>;
}

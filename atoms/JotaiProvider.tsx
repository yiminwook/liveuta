'use client';
import { Provider } from 'jotai';
import GlobalHydrateAtoms from '@/atoms/GlobalHydrateAtoms';
import { getCookies } from '@/utils/getCookie';
import { Promised } from '@/types';

interface JotaiProviderProps {
  children: React.ReactNode;
  cookies: Promised<typeof getCookies>;
}

const JotaiProvider = ({ children, cookies }: JotaiProviderProps) => {
  return (
    <Provider>
      <GlobalHydrateAtoms cookies={cookies}>{children}</GlobalHydrateAtoms>
    </Provider>
  );
};

export default JotaiProvider;

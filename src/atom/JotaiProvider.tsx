'use client';
import { Provider } from 'jotai';
import GlobalHydrateAtoms from '@/atom/GlobalHydrateAtoms';
import { getCookies } from '@/util/getCookie';
import { Promised } from '@/type';

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

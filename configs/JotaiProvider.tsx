import { Provider } from 'jotai';
import { ThemeType } from '@/hooks/useTheme';
import GlobalHydrateAtoms from '@/configs/GlobalHydrateAtoms';

interface JotaiProviderProps {
  children: React.ReactNode;
  theme: ThemeType;
}

const JotaiProvider = ({ children, theme }: JotaiProviderProps) => {
  return (
    <Provider>
      <GlobalHydrateAtoms theme={theme}>{children}</GlobalHydrateAtoms>
    </Provider>
  );
};

export default JotaiProvider;

'use client';
import { ThemeType } from '@/hooks/useTheme';
import JotaiProvider from '@/configs/JotaiProvider';
import Devtools from '@/configs/Devtools';
import ServiceWorker from '@/configs/ServiceWorker';
import ReacQueryProvider from '@/configs/ReactQueryProvider';

interface ConfigsProps {
  children: React.ReactNode;
  theme: ThemeType;
}

const Configs = ({ children, theme }: ConfigsProps) => {
  return (
    <JotaiProvider theme={theme}>
      <ReacQueryProvider>
        {children}
        <ServiceWorker />
        <Devtools />
      </ReacQueryProvider>
    </JotaiProvider>
  );
};

export default Configs;

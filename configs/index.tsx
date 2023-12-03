'use client';
import { ThemeType } from '@/hooks/useTheme';
import JotaiProvider from '@/configs/JotaiProvider';
import SWRProvider from '@/configs/SWRProvider';
import Devtools from '@/configs/Devtools';
import ServiceWorker from '@/configs/ServiceWorker';

interface ConfigsProps {
  children: React.ReactNode;
  theme: ThemeType;
}

const Configs = ({ children, theme }: ConfigsProps) => {
  return (
    <JotaiProvider theme={theme}>
      <SWRProvider>{children}</SWRProvider>
      <ServiceWorker />
      <Devtools />
    </JotaiProvider>
  );
};

export default Configs;

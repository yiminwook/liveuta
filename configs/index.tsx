'use client';
import JotaiProvider from '@/atoms/JotaiProvider';
import Devtools from '@/configs/Devtools';
import ServiceWorker from '@/configs/ServiceWorker';
import ReacQueryProvider from '@/queries/ReactQueryProvider';
import { GetCookiesReturnType } from '@/utils/getCookie';

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

const Configs = ({ children, cookies }: ConfigsProps) => {
  return (
    <JotaiProvider cookies={cookies}>
      <ReacQueryProvider>
        {children}
        <ServiceWorker />
        <Devtools />
      </ReacQueryProvider>
    </JotaiProvider>
  );
};

export default Configs;

'use client';
import JotaiProvider from '@/atoms/JotaiProvider';
import Devtools from '@/configs/Devtools';
import ServiceWorker from '@/configs/ServiceWorker';
import ReactQueryProvider from '@/queries/ReactQueryProvider';
import { GetCookiesReturnType } from '@/utils/getCookie';
import AntdProvider from '@/configs/AntdConfig';
import RootStyleRegistry from '@/styles/RootStyleRegistry';

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

const Configs = ({ children, cookies }: ConfigsProps) => {
  return (
    <JotaiProvider cookies={cookies}>
      <ReactQueryProvider>
        {/* <RootStyleRegistry> */}
        <AntdProvider>
          {children}
          <ServiceWorker />
          <Devtools />
        </AntdProvider>
        {/* </RootStyleRegistry> */}
      </ReactQueryProvider>
    </JotaiProvider>
  );
};

export default Configs;

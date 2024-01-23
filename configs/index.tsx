'use client';
import JotaiProvider from '@/atoms/JotaiProvider';
import Devtools from '@/configs/Devtools';
import ServiceWorker from '@/configs/ServiceWorker';
import ReactQueryProvider from '@/queries/ReactQueryProvider';
import { GetCookiesReturnType } from '@/utils/getCookie';
import AntdProvider from '@/configs/AntdConfig';
// import RootStyleRegistry from '@/configs/RootStyleRegistry';

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

const Configs = ({ children, cookies }: ConfigsProps) => {
  return (
    // <RootStyleRegistry>
    <AntdProvider>
      <JotaiProvider cookies={cookies}>
        <ReactQueryProvider>
          {children}
          <ServiceWorker />
          <Devtools />
        </ReactQueryProvider>
      </JotaiProvider>
    </AntdProvider>
    // </RootStyleRegistry>
  );
};

export default Configs;

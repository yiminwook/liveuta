import JotaiProvider from './Jotai';
import Devtools from './Devtools';
import ServiceWorker from './ServiceWorker';
import ReactQueryProvider from './ReactQuery';
import { GetCookiesReturnType } from '@/util/getCookie';
import AntdProvider from './Antd';
import GlobalHydrate from './GlobalHydrate';

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

const Configs = ({ children, cookies }: ConfigsProps) => {
  return (
    <AntdProvider>
      <JotaiProvider>
        <ReactQueryProvider>
          <GlobalHydrate cookies={cookies}>
            {children}
            <ServiceWorker />
            <Devtools />
          </GlobalHydrate>
        </ReactQueryProvider>
      </JotaiProvider>
    </AntdProvider>
  );
};

export default Configs;

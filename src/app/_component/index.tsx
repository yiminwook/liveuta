import Jotai from './Jotai';
import Devtools from './Devtools';
import ReactQuery from './ReactQuery';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';
import AntdProvider from './Antd';
import GlobalHydrate from './GlobalHydrate';

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

export default function Configs({ children, cookies }: ConfigsProps) {
  return (
    <AntdProvider>
      <Jotai>
        <ReactQuery>
          <GlobalHydrate cookies={cookies}>
            {children}
            <Devtools />
          </GlobalHydrate>
        </ReactQuery>
      </Jotai>
    </AntdProvider>
  );
}

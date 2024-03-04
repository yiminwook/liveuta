import Jotai from './Jotai';
import Devtools from './Devtools';
import ReactQuery from './ReactQuery';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';
import Antd from './Antd';
import GlobalHydrate from './GlobalHydrate';
import ServiceWorker from './ServiceWorker';
import NextAuth from './NextAuth';
import ParticleProvider from './ParticleProvider';

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

export default function Configs({ children, cookies }: ConfigsProps) {
  return (
    <NextAuth>
      <Antd>
        <Jotai>
          <ReactQuery>
            <GlobalHydrate cookies={cookies}>
              <ParticleProvider>{children}</ParticleProvider>
              <ServiceWorker />
              <Devtools />
            </GlobalHydrate>
          </ReactQuery>
        </Jotai>
      </Antd>
    </NextAuth>
  );
}

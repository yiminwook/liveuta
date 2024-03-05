import Jotai from './Jotai';
import Devtools from './Devtools';
import ReactQuery from './ReactQuery';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';
import GlobalHydrate from './GlobalHydrate';
import ServiceWorker from './ServiceWorker';
import NextAuth from './NextAuth';
import dynamic from 'next/dynamic';
import ToastBox from './ToastBox';

const ParticleProvider = dynamic(() => import('./ParticleProvider'), { ssr: false });

interface ConfigsProps {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
}

export default function Configs({ children, cookies }: ConfigsProps) {
  return (
    <NextAuth>
      <Jotai>
        <ReactQuery>
          <GlobalHydrate cookies={cookies}>
            {children}
            <ToastBox />
            <ParticleProvider />
            <ServiceWorker />
            <Devtools />
          </GlobalHydrate>
        </ReactQuery>
      </Jotai>
    </NextAuth>
  );
}

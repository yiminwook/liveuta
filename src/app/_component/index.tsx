import { PORTAL_ID } from '@/const';
import { GetCookiesReturnType } from '@inner/_lib/getCookie';
import Devtools from './Devtools';
import GlobalHydrate from './GlobalHydrate';
import Hotkeys from './Hotkeys';
import Jotai from './Jotai';
import ModalProvider from './ModalProvider';
import NextAuth from './NextAuth';
import ParticleProvider from './ParticleProvider';
import ReactQuery from './ReactQuery';
import ServiceWorker from './ServiceWorker';
import ThemeProvider from './ThemeProvider';
import ToastBox from './ToastBox';

type ConfigsProps = {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
};

export default function Configs({ children, cookies }: ConfigsProps) {
  return (
    <NextAuth>
      <Jotai>
        <ReactQuery>
          <GlobalHydrate cookies={cookies}>
            <ThemeProvider>
              <Hotkeys>
                <ModalProvider>{children}</ModalProvider>
                <ToastBox />
                <ParticleProvider />
                <ServiceWorker />
                <Devtools />
                <div id={PORTAL_ID} />
              </Hotkeys>
            </ThemeProvider>
          </GlobalHydrate>
        </ReactQuery>
      </Jotai>
    </NextAuth>
  );
}

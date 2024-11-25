import { PORTAL_ID } from '@/constants';
import { GetCookiesReturnType } from '@/utils/getCookie';
import Devtools from './Devtools';
import GlobalHydrate from './GlobalHydrate';
import Hotkeys from './Hotkeys';
import Jotai from './Jotai';
import ModalProvider from './ModalProvider';
import NextAuth from './NextAuth';
import ParticleProvider from './ParticleProvider';
import ReactQuery from './ReactQuery';
import ServiceWorker from './ServiceWorker';
import ToastBox from './ToastBox';
import AppProvider from './AppProvider';
import MantineProvider from './MantineProvider';

type ConfigsProps = {
  children: React.ReactNode;
  cookies: GetCookiesReturnType;
};

export default function Configs({ children, cookies }: ConfigsProps) {
  const themeIndex = Number(cookies.theme.replace('theme', '')) || 1;

  return (
    <NextAuth>
      <AppProvider>
        <Jotai>
          <ReactQuery>
            <GlobalHydrate cookies={cookies}>
              <MantineProvider defaultColorScheme={themeIndex > 3 ? 'dark' : 'light'}>
                <Hotkeys>
                  <ModalProvider>{children}</ModalProvider>
                  <ToastBox />
                  <ParticleProvider />
                  <ServiceWorker />
                  <Devtools />
                  <div id="pip" />
                  <div id={PORTAL_ID} />
                </Hotkeys>
              </MantineProvider>
            </GlobalHydrate>
          </ReactQuery>
        </Jotai>
      </AppProvider>
    </NextAuth>
  );
}

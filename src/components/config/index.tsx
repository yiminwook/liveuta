import { PORTAL_ID } from '@/constants';
import { TGetCookiesReturn } from '@/utils/getCookie';
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
import { isDarkModeEnabled } from '@/utils/helper';

type ConfigsProps = {
  children: React.ReactNode;
  cookies: TGetCookiesReturn;
};

export default function Configs({ children, cookies }: ConfigsProps) {
  const isDarkMode = isDarkModeEnabled(cookies.theme);
  return (
    <NextAuth>
      <AppProvider>
        <Jotai>
          <ReactQuery>
            <GlobalHydrate cookies={cookies}>
              <MantineProvider defaultColorScheme={isDarkMode ? 'dark' : 'light'}>
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

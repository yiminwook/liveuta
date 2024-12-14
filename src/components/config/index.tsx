import { PORTAL_ID } from '@/constants';
import { TGetCookiesReturn } from '@/utils/getCookie';
import { isDarkModeEnabled } from '@/utils/helper';
import AppProvider from './AppProvider';
import Devtools from './Devtools';
import GlobalHydrate from './GlobalHydrate';
import Hotkeys from './Hotkeys';
import Jotai from './Jotai';
import MantineProvider from './MantineProvider';
import ModalProvider from './ModalProvider';
import NProgressProviders from './NProgress';
import NextAuth from './NextAuth';
import ParticleProvider from './ParticleProvider';
import ReactQuery from './ReactQuery';
import ServiceWorker from './ServiceWorker';
import ToastBox from './ToastBox';

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
              <NProgressProviders>
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
              </NProgressProviders>
            </GlobalHydrate>
          </ReactQuery>
        </Jotai>
      </AppProvider>
    </NextAuth>
  );
}

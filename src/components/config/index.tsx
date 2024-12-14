import { PORTAL_ID } from '@/constants';
import { modals } from '@/libraries/modal/modals';
import { TGetCookiesReturn } from '@/utils/getCookie';
import { isDarkModeEnabled } from '@/utils/helper';
import { ModalsProvider } from '@mantine/modals';
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
                    <ModalsProvider modals={modals}>
                      <ModalProvider>{children}</ModalProvider>
                    </ModalsProvider>
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

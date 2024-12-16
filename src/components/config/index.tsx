import { PORTAL_ID } from '@/constants';
import { TGetCookiesReturn } from '@/utils/getCookie';
import AppProvider from './AppProvider';
import Devtools from './Devtools';
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
  colorScheme: 'light' | 'dark';
};

export default function Configs({ children, cookies, colorScheme }: ConfigsProps) {
  return (
    <NextAuth>
      <AppProvider
        initState={{
          theme: cookies.theme,
          isShowSidebar: false,
          isShowAcctSidebar: false,
        }}
      >
        <Jotai>
          <ReactQuery>
            <NProgressProviders>
              <MantineProvider defaultColorScheme={colorScheme}>
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
          </ReactQuery>
        </Jotai>
      </AppProvider>
    </NextAuth>
  );
}

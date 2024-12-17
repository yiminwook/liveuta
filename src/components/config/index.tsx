import { TGetCookiesReturn } from '@/utils/getCookie';
import AppProvider from './AppProvider';
import Devtools from './Devtools';
import Hotkeys from './Hotkeys';
import MantineProvider from './MantineProvider';
import ModalContainer from './ModalContainer';
import NProgressProviders from './NProgress';
import NextAuth from './NextAuth';
import Particle from './Particle';
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
        <ReactQuery>
          <NProgressProviders>
            <MantineProvider defaultColorScheme={colorScheme}>
              <Hotkeys>
                {children}
                <ToastBox />
                <Particle />
                <ServiceWorker />
                <Devtools />
                <div id="pip" />
                <ModalContainer />
              </Hotkeys>
            </MantineProvider>
          </NProgressProviders>
        </ReactQuery>
      </AppProvider>
    </NextAuth>
  );
}

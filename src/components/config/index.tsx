import { auth } from '@/libraries/nextAuth';
import { TMetadata } from '@/types';
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

export default async function Configs({ children, cookies, colorScheme }: ConfigsProps) {
  const [session, metadata] = await Promise.all([
    auth(),
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/metadata`, {
      next: { revalidate: 3600, tags: ['metadata'] },
    })
      .then((res) => res.json() as Promise<{ data: TMetadata }>)
      .then((json) => json.data),
  ]);

  return (
    <NextAuth session={session}>
      <AppProvider
        initState={{
          theme: cookies.theme,
          defaultVideoId: metadata.default_video_id,
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

import { TMetadata } from '@/types';
import { TGetCookiesReturn } from '@/utils/getCookie';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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
  locale: string;
};

export default async function Configs({ children, cookies, locale }: ConfigsProps) {
  const [metadata] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/metadata`, {
      next: { revalidate: 3600, tags: ['metadata'] },
    })
      .then((res) => res.json() as Promise<{ data: TMetadata }>)
      .then((json) => json.data),
  ]);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuth>
        <AppProvider
          initState={{
            defaultVideoId: metadata.default_video_id,
          }}
        >
          <ReactQuery>
            <NProgressProviders>
              <MantineProvider locale={locale}>
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
    </NextIntlClientProvider>
  );
}

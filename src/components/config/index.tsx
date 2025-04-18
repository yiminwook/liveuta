import { serverApi } from '@/apis/fetcher';
import { METADATAS_TAG } from '@/constants/revalidateTag';
import { TMetadata } from '@/types';
import { TGetCookiesReturn } from '@/utils/getCookie';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import CommandMenu from '../common/command/CommandMenu';
import { CommandProvider } from '../common/command/Context';
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
    serverApi
      .get<{ data: TMetadata }>('v1/metadata', {
        next: { revalidate: 3600, tags: [METADATAS_TAG] },
      })
      .json()
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
                  <CommandProvider>
                    {children}
                    <CommandMenu />
                    <ToastBox />
                    <Particle />
                    <ServiceWorker />
                    <Devtools />
                    <ModalContainer />
                  </CommandProvider>
                </Hotkeys>
              </MantineProvider>
            </NProgressProviders>
          </ReactQuery>
        </AppProvider>
      </NextAuth>
    </NextIntlClientProvider>
  );
}

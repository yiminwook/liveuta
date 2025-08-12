import { getCookies } from '@/apis/cached';
import { serverApi } from '@/apis/fetcher';
import { METADATAS_TAG } from '@/constants/revalidate-tag';
import { TLocaleCode } from '@/libraries/i18n/type';
import { Promised, TMetadata } from '@/types';
import CommandMenu from '../common/command/CommandMenu';
import { CmdProvider } from '../common/command/Context';
import AppProvider from './AppProvider';
import Devtools from './Devtools';
import Hotkeys from './Hotkeys';
import MantineProvider from './MantineProvider';
import ModalContainer from './ModalContainer';
import BProgressProviders from './BProgress';
import NextAuth from './NextAuth';
import Particle from './Particle';
import ReactQuery from './ReactQuery';
import ServiceWorker from './ServiceWorker';
import ToastBox from './ToastBox';

type ConfigsProps = {
  children: React.ReactNode;
  cookies: Promised<typeof getCookies>;
  locale: TLocaleCode;
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

  return (
    <NextAuth>
      <AppProvider
        initState={{
          defaultVideoId: metadata.default_video_id,
        }}
      >
        <ReactQuery locale={locale}>
          <BProgressProviders>
            <MantineProvider locale={locale}>
              <Hotkeys>
                <CmdProvider locale={locale}>
                  {children}
                  <CommandMenu locale={locale} />
                  <ToastBox />
                  <Particle />
                  <ServiceWorker />
                  <Devtools />
                  <ModalContainer />
                </CmdProvider>
              </Hotkeys>
            </MantineProvider>
          </BProgressProviders>
        </ReactQuery>
      </AppProvider>
    </NextAuth>
  );
}

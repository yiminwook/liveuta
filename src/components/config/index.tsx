import { getCookies } from '@/apis/cached';
import { serverApi } from '@/apis/fetcher';
import { METADATAS_TAG } from '@/constants/revalidate-tag';
import { TLocaleCode } from '@/libraries/i18n/type';
import { Promised, TMetadata } from '@/types';
import CommandMenu from '../common/command/CommandMenu';
import { CmdProvider } from '../common/command/Context';
import AppProvider from './AppProvider';
import AsyncModalContainer from './async-modal-container';
import { AuthProvider } from './auth-provider';
import BProgressProviders from './BProgress';
import Devtools from './Devtools';
import Hotkeys from './Hotkeys';
import MantineProvider from './MantineProvider';
import Particle from './Particle';
import PortalModalContainer from './portal-modal-container';
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
    <AuthProvider>
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
                  <PortalModalContainer />
                  <AsyncModalContainer />
                </CmdProvider>
              </Hotkeys>
            </MantineProvider>
          </BProgressProviders>
        </ReactQuery>
      </AppProvider>
    </AuthProvider>
  );
}

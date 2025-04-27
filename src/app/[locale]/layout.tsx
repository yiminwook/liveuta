import { serverApi } from '@/apis/fetcher';
import getQueryClient from '@/apis/getQueryClient';
import DataFetchingObserver from '@/components/common/DataFetchingObserver';
import PageView from '@/components/common/PageView';
import BottomTab from '@/components/common/bottomTab/BottomTab';
import Header from '@/components/common/header/Header';
import AccountSidebar from '@/components/common/sidebar/Account';
import Document from '@/components/config/Document';
import { CHANNELS_TAG } from '@/constants/revalidateTag';
import { FALLBACK_LANG, LANGUAGES } from '@/libraries/i18n/config';
import { TLocaleCode } from '@/libraries/i18n/type';
import { TGetChannelRes } from '@api/v1/channel/route';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const checkIsRoutingLocale = (locale: string): locale is TLocaleCode => {
  return LANGUAGES.includes(locale as TLocaleCode);
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout(props: Props) {
  const params = await props.params;
  const locale = params.locale;

  if (!checkIsRoutingLocale(locale)) {
    redirect(`/${FALLBACK_LANG}/not-found`);
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CHANNELS_TAG],
    queryFn: () =>
      serverApi
        .get<TGetChannelRes>('v1/channel', {
          next: { revalidate: 1800, tags: [CHANNELS_TAG] },
        })
        .json()
        .then((json) => json.data),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Document locale={locale}>
      <HydrationBoundary state={dehydratedState}>
        <DataFetchingObserver />
        <PageView>
          <Header />
          <>{props.children}</>
          <BottomTab />
          <AccountSidebar />
        </PageView>
      </HydrationBoundary>
    </Document>
  );
}

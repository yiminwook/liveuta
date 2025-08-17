import { ReactNode } from 'react';
import GlobalPip from '@/components/common/player/global-pip';
import { TLocaleCode } from '@/libraries/i18n/type';

type Props = {
  params: Promise<{ locale: TLocaleCode }>;
  children: ReactNode;
};

export default async function Layout(props: Props) {
  const params = await props.params;
  const locale = params.locale;
  return (
    <>
      {props.children}
      <GlobalPip locale={locale} />
    </>
  );
}

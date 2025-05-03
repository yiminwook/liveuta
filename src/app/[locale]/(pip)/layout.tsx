import GlobalPip from '@/components/common/player/GlobalPip';
import { TLocaleCode } from '@/libraries/i18n/type';
import { ReactNode } from 'react';

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

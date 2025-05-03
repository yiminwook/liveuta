import Home from '@/components/setting/Home';
import { TLocaleCode } from '@/libraries/i18n/type';

type Props = {
  params: Promise<{ locale: TLocaleCode }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const locale = params.locale;
  return <Home locale={locale} />;
}

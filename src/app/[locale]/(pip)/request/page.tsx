import Iframe from '@/components/common/Iframe';
import Background from '@/components/common/background/Background';
import Home from '@/components/request/home';
import { TLocaleCode } from '@/libraries/i18n/type';

type Props = {
  params: Promise<{ locale: TLocaleCode }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const locale = params.locale;

  return (
    <Background>
      {/* <Iframe url={process.env.NEXT_PUBLIC_REQUEST_URL} /> */}
      <Home locale={locale} />
    </Background>
  );
}

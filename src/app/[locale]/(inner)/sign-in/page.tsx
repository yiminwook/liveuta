import { Metadata } from 'next';
import { UnAuthorized } from '@/components/common/authorization/UnAuthorized';
import Home from '@/components/sign-in/home';

export const metadata: Metadata = {
  title: '로그인 | Live Uta',
};

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const locale = params.locale;

  return (
    <UnAuthorized homeUrl={`/${locale}`}>
      <Home />
    </UnAuthorized>
  );
}

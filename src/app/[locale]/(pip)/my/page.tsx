import { Authorized } from '@/components/common/authorization/Authorized';
import Home from '@/components/my/Home';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  const locale = params.locale;

  return (
    <Authorized signInUrl={`/${locale}/sign-in`}>
      <Home />
    </Authorized>
  );
}

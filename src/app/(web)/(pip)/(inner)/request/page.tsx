import Iframe from '@/components/common/Iframe';
import Background from '@/components/common/background/Background';

export default async function Page() {
  return (
    <Background>
      <Iframe url={process.env.NEXT_PUBLIC_REQUEST_URL} />
    </Background>
  );
}

import Background from '@/components/common/Background';
import Iframe from '@/components/common/Iframe';

export default async function Page() {
  return (
    <Background>
      <Iframe url={process.env.NEXT_PUBLIC_REQUEST_URL} />
    </Background>
  );
}

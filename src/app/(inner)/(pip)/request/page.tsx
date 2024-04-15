import Background from '@inner/_component/Background';
import Iframe from '@inner/_component/Iframe';

export default async function Page() {
  return (
    <Background>
      <Iframe url={process.env.NEXT_PUBLIC_REQUEST_URL} />
    </Background>
  );
}

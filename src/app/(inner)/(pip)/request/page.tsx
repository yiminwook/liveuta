import Iframe from '@inner/_component/Iframe';

export default async function Page() {
  return <Iframe url={process.env.NEXT_PUBLIC_REQUEST_URL} />;
}

import Authorized from '@/components/config/Authorized';
import Document from '@/components/config/Document';
import Client from './page.client';

export default async function Page() {
  return (
    <Document locale="ko">
      <Authorized signInUrl={`/ko/login`}>
        <Client />
      </Authorized>
    </Document>
  );
}

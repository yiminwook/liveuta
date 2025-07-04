import { Authorized } from '@/components/common/authorization/Authorized';
import Document from '@/components/config/document';
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

import { Administrator } from '@/components/common/authorization/Administrator';
import { Authorized } from '@/components/common/authorization/Authorized';
import Document from '@/components/config/document';
import Client from './layout.client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  return (
    <Document locale="ko">
      <Authorized signInUrl={`/ko/sign-in`}>
        <Administrator fallback={null}>
          <Client>{children}</Client>
        </Administrator>
      </Authorized>
    </Document>
  );
}

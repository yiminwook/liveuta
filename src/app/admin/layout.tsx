import Administrator from '@/components/config/Administrator';
import Authorized from '@/components/config/Authorized';
import Document from '@/components/config/Document';
import Client from './layout.client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  return (
    <Document locale="ko">
      <Authorized signInUrl={`/ko/login`}>
        <Administrator>
          <Client>{children}</Client>
        </Administrator>
      </Authorized>
    </Document>
  );
}

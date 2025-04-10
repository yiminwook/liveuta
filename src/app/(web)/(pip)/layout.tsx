import GlobalPip from '@/components/common/player/GlobalPip';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <GlobalPip />
    </>
  );
}

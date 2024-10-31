import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const Pip = dynamic(() => import('@/components/common/player/Pip'), { ssr: false });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Pip />
    </>
  );
}

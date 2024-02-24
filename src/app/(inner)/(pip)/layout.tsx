import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const Pip = dynamic(() => import('@inner/_component/player/Pip'), { ssr: false });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Pip />
    </>
  );
}

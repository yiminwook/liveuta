import Pip from '@/components/common/player/Pip';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Pip />
    </>
  );
}

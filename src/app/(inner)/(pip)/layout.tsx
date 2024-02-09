import Pip from '@inner/_component/player/Pip';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Pip />
    </>
  );
}

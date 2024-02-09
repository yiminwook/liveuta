'use client';
import Pip from '@inner/_component/player/Pip';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Pip />
    </>
  );
};

export default Layout;

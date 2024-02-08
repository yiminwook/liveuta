'use client';
import Pip from '@/components/common/player/Pip';
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

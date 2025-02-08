import Fire from '@/libraries/error/Fire';
import { PropsWithChildren } from 'react';

export default function TestErrorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Fire label="layout" />
      {children}
    </>
  );
}

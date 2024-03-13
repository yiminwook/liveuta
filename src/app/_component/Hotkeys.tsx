'use client';
import { PropsWithChildren } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';

export default function Hotkeys({ children }: PropsWithChildren) {
  return <HotkeysProvider>{children}</HotkeysProvider>;
}

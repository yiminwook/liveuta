'use client';
import { useAtom } from 'jotai';
import { setlistModalAtom } from '../_lib/atom';
import dynamic from 'next/dynamic';

const SetlistModal = dynamic(() => import('./SetlistModal'), { ssr: false });

export default function Modal() {
  const [modalValue] = useAtom(setlistModalAtom);

  return <>{modalValue && <SetlistModal />}</>;
}

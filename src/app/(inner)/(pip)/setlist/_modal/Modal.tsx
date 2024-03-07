'use client';
import { useAtom } from 'jotai';
import SetlistModal from './SetlistModal';
import { setlistModalAtom } from '../_lib/atom';

export default function Modal() {
  const [modalValue] = useAtom(setlistModalAtom);

  return <>{modalValue && <SetlistModal />}</>;
}

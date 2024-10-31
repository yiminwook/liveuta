'use client';
import ModalContainer from '@/libraries/modal/ModalContainer';
import ModalContext from '@/libraries/modal/ModalContext';
import ModalController from '@/libraries/modal/ModalController';
import { PropsWithChildren, useState } from 'react';

export default function ModalProvider({ children }: PropsWithChildren) {
  const renderState = useState(1);
  const [modalController] = useState(() => new ModalController(renderState));

  return (
    <ModalContext.Provider value={modalController}>
      <> {children}</>
      <ModalContainer />
    </ModalContext.Provider>
  );
}

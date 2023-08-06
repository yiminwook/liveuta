'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: PortalProps) => {
  return createPortal(children, document.getElementById('modal-root')!);
};

export default ModalPortal;

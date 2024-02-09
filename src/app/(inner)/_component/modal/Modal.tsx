'use client';
import { CSSProperties, MouseEvent, ReactNode } from 'react';
import modal from './modal.module.scss';
import ModalPortal from './ModalPortal';
import CloseButton from '../button/CloseButton';
import useStopPropagation from '@/hook/useStopPropagation';

interface ModalProps {
  children: ReactNode;
  style?: CSSProperties;
  onClose: (e: MouseEvent) => void;
}

const Modal = ({ children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();

  return (
    <ModalPortal>
      <div className={modal['container']} onClick={onClose}>
        <div className={modal['modal']} style={style} onClick={stopPropagation}>
          <CloseButton className={modal['close-button']} onClose={onClose} />
          <div className={modal['inner']}>{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;

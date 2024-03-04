'use client';
import { CSSProperties, MouseEvent, ReactNode } from 'react';
import modal from './modal.module.scss';
import CloseButton from '../button/CloseButton';
import useStopPropagation from '@/hook/useStopPropagation';
import { RemoveScroll } from 'react-remove-scroll';
import Backdrop from '../Backdrop';

interface ModalProps {
  children: ReactNode;
  style?: CSSProperties;
  onClose: (e: MouseEvent) => void;
}

const Modal = ({ children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();

  return (
    <RemoveScroll removeScrollBar={false}>
      <Backdrop />
      <div className={modal['container']} onClick={onClose}>
        <div className={modal['modal']} style={style} onClick={stopPropagation}>
          <CloseButton className={modal['close-button']} onClick={onClose} />
          <div className={modal['inner']}>{children}</div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default Modal;

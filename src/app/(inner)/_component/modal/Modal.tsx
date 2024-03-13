'use client';
import { CSSProperties, ReactNode, useEffect } from 'react';
import modal from './modal.module.scss';
import CloseButton from '../button/CloseButton';
import useStopPropagation from '@/hook/useStopPropagation';
import { RemoveScroll } from 'react-remove-scroll';
import Backdrop from '../Backdrop';
import { useHotkeys } from 'react-hotkeys-hook';

interface ModalProps {
  children: ReactNode;
  style?: CSSProperties;
  onClose: () => void;
}

const Modal = ({ children, style, onClose }: ModalProps) => {
  const { stopPropagation } = useStopPropagation();
  const containerRef = useHotkeys<HTMLDivElement>('esc', (e) => {
    e.stopPropagation();
    onClose();
  });

  useEffect(() => {
    containerRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RemoveScroll removeScrollBar={false}>
      <Backdrop activeParticles={true} />
      <div ref={containerRef} tabIndex={-1} className={modal['container']} onClick={onClose}>
        <div className={modal['modal']} style={style} onClick={stopPropagation}>
          <CloseButton className={modal['close-button']} onClick={onClose} />
          <div className={modal['inner']}>{children}</div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default Modal;
